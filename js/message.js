/* script whith defer */

//Конструкторы: GameOver, YouWin
;(function(){
   "use strict"
   
   /** 
    * Конструктор Message 
    * Не предназначен на самостоятельное еспользование
    * @param {object} options. Настройки. Содержит свойства:
    * {function} start - выполняется в начале show
    * {function} end - выполняется в конце show
    */
   
   function Message(options) {
      this.getHTMLElements();
      this.createOptions(options);
   }
   
   Message.prototype.show = function(options) {
      this.start.apply(this.start, arguments); 
      
      this.el.container.style.display = 'block';
      
      setTimeout(function() {
         this.el.container.style.opacity = 1;
      }.bind(this), 50); 
      
      return this;
   }
   
   Message.prototype.hide = function() {
      this.el.container.style.display = 'none';
      this.el.container.style.opacity = 0;
      
      this.end.apply(this.end, arguments); 
      
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
      
      this.start = options.start || this._defaultFun;
      this.end = options.end || this._defaultFun;
      
      return this;
   }
   
   Message.prototype.containerClassName = ''; //Указывается в класах потомках
   
   
   /** 
    * Конструктор GameOver
    *
    * @param {object} options. Настройки. Содержит свойства: 
    * {function} functionRestart - функция, выполняемая при клике по restart
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
      console.log(this.el)
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
    * Конструктор YouWin
    *
    * @param {object} options. Настройки. Содержит свойства: 
    * {function} functionRestart - функция, выполняемая при клике по restart
    * {function} functionContinue - Функция, выполняемая при клике по keep
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
   
}());