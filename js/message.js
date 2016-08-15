﻿/* script whith defer */

//Конструкторы: GameOver, YouWin, Combo
;(function(){
   "use strict"
   
   /** 
    * Конструктор Message 
    * Не предназначен на самостоятельное использование
    * @param {object} options. Настройки. Содержит свойства:
    * {function} beforeShow - выполняется в начале show
    * {function} afterHide - выполняется в конце show
    */
   
   function Message(options) {
      this.getHTMLElements();
      this.createOptions(options);
   }
   
   Message.prototype.show = function(options) {
      this.beforeShow.apply(this.beforeShow, arguments); 
      
      this.el.container.style.display = 'block';
      
      setTimeout(function() {
         this.el.container.style.opacity = 1;
      }.bind(this), 50); 
      
      return this;
   }
   
   Message.prototype.hide = function() {
      this.el.container.style.display = 'none';
      this.el.container.style.opacity = 0;
      
      this.afterHide.apply(this.afterHide, arguments); 
      
      return this;
   }
   
   Message.prototype.getHTMLElements = function() {
      this.el = {}; //this.el.* - html elements
      
      this.el.game = document.getElementById('game');
      
      if (this.containerClassName) {
         this.el.container = this.el.game.
            getElementsByClassName(this.containerClassName)[0];
      }
      
      return this;
   }
   
   Message.prototype.createOptions = function(options) {
      this._defaultFun = function() {};
      
      this.beforeShow = options.beforeShow || this._defaultFun;
      this.afterHide = options.afterHide || this._defaultFun;
      
      return this;
   }
   
   Message.prototype.containerClassName = ''; //Указывается в класах потомках
   
   
   /** 
    * Конструктор GameOver (наследует от Message)
    *
    * @param {object} options. Настройки. Содержит свойства: 
    * {function} restart - функция, выполняемая при клике по restart
    */
   
   window.GameOver = function(options) {
      //Функциональное наследование от Message
      Message.apply(this, arguments); 
      
      this.initEvents();
   }
   
   //Прототипное наследование от Message
   GameOver.prototype = Object.create(Message.prototype);
   GameOver.prototype.constructor = GameOver;
   
   //Другие методы GameOver.prototype
   
   GameOver.prototype.getHTMLElements = function() {
      Message.prototype.getHTMLElements.apply(this, arguments);
      
      
      this.el.restart = this.el.container.
         getElementsByClassName('game__message-restart')[0];
      return this;
   }
   
   GameOver.prototype.initEvents = function() {
      var self = this;
   
      this.el.restart.addEventListener('click', function() {
         self.restart.apply(self.restart, arguments); 
         self.hide();
      })
      
      return this;
   }
   
   GameOver.prototype.createOptions = function(options) {
      Message.prototype.createOptions.apply(this, arguments);
   
      this.restart = options.restart || this._defaultFun;
      
      return this;
   };
   
   GameOver.prototype.containerClassName = 'game__game-over';
   
   
   /** 
    * Конструктор YouWin (наследует от Message)
    *
    * @param {object} options. Настройки. Содержит свойства: 
    * {function} restart - функция, выполняемая при клике по restart
    * {function} keep - Функция, выполняемая при клике по keep
    */
   
   window.YouWin = function(options) {
      //Функциональное наследование от Message
      Message.apply(this, arguments); 
      
      this.initEvents();
   }
   
   //Прототипное наследование от Message
   YouWin.prototype = Object.create(Message.prototype);
   YouWin.prototype.constructor = YouWin;
   
   //Другие методы YouWin.prototype
   
   YouWin.prototype.getHTMLElements = function() {
      Message.prototype.getHTMLElements.apply(this, arguments);
      
      
      this.el.restart = this.el.container.
         getElementsByClassName('game__message-restart')[0];
      
      this.el.keep = this.el.container.
         getElementsByClassName('game__message-keep')[0];
   
      return this;
   }
   
   YouWin.prototype.initEvents = function() {
      var self = this;
      
      this.el.restart.addEventListener('click', function() {
         self.restart.apply(self.restart, arguments); 
         self.hide();
      })
      
      this.el.keep.addEventListener('click', function() {
         self.keep.apply(self.keep, arguments)
         self.hide();
      })
      
      return this;
   }
   
   YouWin.prototype.createOptions = function(options) {
      Message.prototype.createOptions.apply(this, arguments);
      
      this.restart = options.restart || this._defaultFun; 
      this.keep = options.keep || this._defaultFun;
      
      return this;
   };
   
   YouWin.prototype.containerClassName = 'game__you-win';
   
   
   /** 
    * Конструктор Combo (наследует от Message)
    *
    * @param {object} options. Настройки. Содержит свойства: 
    * {string} text - Отображаемый текст
    * {number} delay - Через сколько милисекунд будет скрыт text
    */
   
   window.Combo = function(options) {
      //Функциональное наследование от Message
      Message.apply(this, arguments); 
      
      this.setText();
   }
   
   //Прототипное наследование от Message
   Combo.prototype = Object.create(Combo.prototype);
   Combo.prototype.constructor = Combo;
   
   //Другие методы Combo.prototype
   
   Combo.prototype.getHTMLElements = function() {
      Message.prototype.getHTMLElements.apply(this, arguments);
      
      this.el.p = this.el.container.
         getElementsByClassName('game__message-p-combo')[0];
   
      return this;
   }
   
   Combo.prototype.setText = function() {
      this.el.p.innerText = this.text;
   }
   
   Combo.prototype.updateText = function(text) {
      this.text = text || this.text;
      this.setText();
   }
   
   Combo.prototype.show = function(text) {  
      this.updateText(text);
   
      Message.prototype.show.apply(this, arguments);
      
      setTimeout(function() {
         this.hide();
      }.bind(this), this.delay);
      
      return this;
   }
   
   Combo.prototype.hide = function() {
      this.el.container.style.opacity = 0;
      
      setTimeout(function() {
         this.el.container.style.display = 'none';
      }.bind(this), 500);
      
      return this;
   }
   
   
   
   Combo.prototype.createOptions = function(options) {
      Message.prototype.createOptions.apply(this, arguments);
      
      this.text = options.text || 'Monster';
      this.delay = options.delay || 1000;
      
      return this;
   };
   
   Combo.prototype.containerClassName = 'game__combo';
   
}());