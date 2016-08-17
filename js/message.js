/* script whith defer */

//Конструкторы: GameOver, YouWin, Combo, Menu, Prompt (наследуют от Message)
;(function(){
   "use strict"
   
   /** 
    * Конструктор Message 
    * Не предназначен на самостоятельное использование
    *
    * @param {object} options. Настройки. Содержит свойства:
    * {function} beforeShow - выполняется в начале show
    * {function} afterHide - выполняется в конце show
    */
   
   function Message(options) {
      this.createOptions(options);
      this.getHTMLElements();
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
      
      if (this.el.container) {
         this.el.parent = this.el.container.
            getElementsByClassName('game__message-parent')[0];
      }
      
      return this;
   }
   
   Message.prototype.createOptions = function(options) {
      if (!options) options = {};
      
      this._defaultFun = function() {};
      
      this.beforeShow = options.beforeShow || this._defaultFun;
      this.afterHide = options.afterHide || this._defaultFun;
      
      this.containerClassName = options.containerClassName ||
         this.containerClassName;
      
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
   

   /** 
    * Конструктор Menu (наследует от Message)
    *
    * @param {object} options. Настройки. Содержит свойства: 
    * {string} containerClassName - класс контейнера
    */
   window.Menu = function(options) {//Функциональное наследование от Message
      Message.apply(this, arguments); 
      
      this.allItems = [];      
   }
   
   //Прототипное наследование от Message
   Menu.prototype = Object.create(Message.prototype);
   Menu.prototype.constructor = Menu;
   
   //Другие методы Menu.prototype
   
   //Добавляет элемент меню
   Menu.prototype.addItem = function(text, calback) {
      if (typeof calback !== 'function') {
         calback = function() {}
      }
   
      this.allItems.push( this.createItem(text, calback) );
      
      return this;
   }
   
   Menu.prototype.createItem = function(text, calback) {
      var item = document.createElement('p');
      item.className = this.itemClassName;
      item.innerText = text;
      
      this.addEvent(item, calback);
      
      this.el.parent.appendChild(item);
      
      return this;
   }
   
   Menu.prototype.addEvent = function(item, calback) {
      item.addEventListener('click', function() {
         calback.apply(calback);
         this.hide();
      }.bind(this));
      
      return this;
   }
   
   Menu.prototype.hide = function() {
      this.el.container.style.opacity = 0;
      
      setTimeout(function() {
         this.el.container.style.display = 'none';
      }.bind(this), 500);
      
      return this;
   }
   
   Menu.prototype.containerClassName = 'game__menu';
   Menu.prototype.itemClassName = 'game__message-button game-menu-item';
   
   
   /** 
    * Конструктор Prompt (наследует от Message)
    *
    * @param {object} options. Настройки. Содержит свойства:
    * {function} onShow - выполняется при .show()
    * {function} onHide - выполняется при .hide()
    */
   window.Prompt = function(options) {//Функциональное наследование от Message
      Message.apply(this, arguments);  
      
      this.initEvents();
   }
   
   //Прототипное наследование от Message
   Prompt.prototype = Object.create(Message.prototype);
   Prompt.prototype.constructor = Prompt;
   
   //Другие методы Prompt.prototype
   
   Prompt.prototype.initEvents = function() {
      this.el.input.addEventListener('blur', function() {
         this.hide();
      }.bind(this));
      
      return this;
   }
   
   Prompt.prototype.getHTMLElements = function() {
      Message.prototype.getHTMLElements.apply(this, arguments);
      
      this.el.input = this.el.container.
         getElementsByClassName('game_prompt-input')[0];
   
      return this;
   }
   
   Prompt.prototype.show = function(val) {
      Message.prototype.show.apply(this, arguments);
      
      this.setVal(val);
      this.onShow(this);
      this.el.input.focus();
      
      return this;
   }
   
   Prompt.prototype.hide = function(text) {
      this.el.container.style.opacity = 0;
      
      setTimeout(function() {
         this.el.container.style.display = 'none';
      }.bind(this), 500);
      
      this.onHide(this);
      
      return this;
   }
   
   Prompt.prototype.updateOnHide = function(onHide) {
      if(typeof onHide === 'function') {
         this.onHide = onHide;
      }
      
      return this;
   }
   
   Prompt.prototype.setVal = function(val) {
      this.el.input.value = val;
      
      return this;
   }
   
   Prompt.prototype.getVal = function() {
      return this.el.input.value;
   }
   
   Prompt.prototype.createOptions = function(options) {   
      Message.prototype.createOptions.apply(this, arguments);
      
      if (options) {
         this.onShow = options.onShow || this._defaultFun;
         this.onHide = options.onHide || this._defaultFun;
      }
      return this;
   };
   
   Prompt.prototype.containerClassName = 'game__prompt';
   
}());
