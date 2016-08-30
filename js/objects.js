/* script whith defer */

//Конструкторы: Tile, ConsoleTile, Score, BestScore, Random
;(function(){
   "use strict"
   
   /** 
    * Конструктор плиток с числами для игры 2048
    *
    * @param {object} options. Настройки плитки. Содержит свойства: 
    * {number} x, y, n - соответствено координаты х, y и значение
    * {html element} parent - родительский элемент
    * {number} size - ширина и высота плитки
    * {number} fontSize - размер шрифта
    */
   window.Tile = function(options) {
      this.createOptions(options);
      this.create();
   }
   
   Tile.prototype.create = function () {
      this.createBaseTile();
      this.createTileStart();
      setTimeout(this.createTileEnd.bind(this));
      
      return this;
   }
   
   Tile.prototype.createBaseTile = function (options) {
      this.el = document.createElement('div');
      this.setClassName();      
      
      this.el.innerText = this.n;      
      this.parent.appendChild(this.el);
      
      return this;
   }
   
   Tile.prototype.createTileStart = function(options) {
      this.el.style.width = 1 + 'px';
      this.el.style.height = 1 + 'px';
      this.el.style['font-size'] = 1 + 'px';
      this.el.style['line-height'] = 1 + 'px';
      
      this.el.style.left = this.left + this.size / 2 + 'px';
      this.el.style.top = this.top + this.size / 2 + 'px';
      
      return this;
   }
   
   Tile.prototype.createTileEnd = function(options) {
      this.el.style.width = this.size + 'px';
      this.el.style.height = this.size + 'px';
      this.el.style['line-height'] = this.size + 'px';
      this.el.style['font-size'] = this.fontSize + 'px';
      
      this.el.style.left = this.left + 'px';
      this.el.style.top = this.top + 'px';
      
      return this;
   }
   
   //options {left, top, n}
   Tile.prototype.update = function(options) {
      this.updateOptions(options.left, options.top, options.n);
      
      this.setClassName();
      this.el.style.left = this.left + 'px';
      this.el.style.top = this.top + 'px';
      this.el.innerText = this.n;
      
      return this;
   }
   
   Tile.prototype.updateOptions = function(left, top, n) {
      this.left = left || this.left;
      this.top = top || this.top;
      this.n = n || this.n;
      
      return this;
   }
   
   Tile.prototype.setClassName = function() {
      this.el.className = this.CLASSES.base + ' ' +
         this.CLASSES.base + '-' + this.n;
         
      return this;
   }
   
   Tile.prototype.remove = function() {
      this.parent.removeChild(this.el);
   }
   
   Tile.prototype.createOptions = function(options) {
      this.parent = options.parent || document.body;
      this.left = options.left;
      this.top = options.top;
      this.n = options.n;
      this.size = options.size;
      this.fontSize = options.fontSize || 20;
      
      return this;
   }
   
   Tile.prototype.CLASSES = {
      base: 'game__tile',
   }
   
   /** 
    * Конструктор плиток с числами для игры 2048 (Консольный вариант)
    *
    * @param {object} options. Настройки плитки. Содержит свойства: 
    * {number} x, y, n - соответствено координаты х, y и значение n
    */
   window.ConsoleTile = function(options) {
      this.create(options);
   }
   
   ConsoleTile.prototype.create = function(options) {      
      this.x = options.x || 1;
      this.y = options.y || 1;
      this.n = options.n || 2;
      
      return this;
   }
   
   /** 
    * Конструктор Storage - управление localStorage
    *
    * @param {string} prefix - приставка для свойств
    */
    
   window.Storage = function(prefix) {
      this.prefix = prefix || '';
   }

   Storage.prototype.set = function(key, val) {
      localStorage[this.prefix + (key || '')] = JSON.stringify(val);
      return this;
   }
   
   Storage.prototype.get = function(key) {
      var val = localStorage[this.prefix + (key || '')];
      return (val) ? JSON.parse(val) : val;
   }
   
   /** 
    * Конструктор Score
    *
    * @param {object} options - настройки. Содержит свойства:
    * {html element} element - элемент для score
    * {html element} scorePluse - элемент для анимирования
    */
   window.Score = function(options) {
      this.createOptions(options);
      this.create();
   }
   Score.prototype.create = function() {
      this.element.innerText = this.start;
      
      return this;
   }
   
   Score.prototype.add = function(val) {
      this.element.innerText = +this.element.innerText + val;
      this.animateAdd(val);
      
      return this
   } 
   
   Score.prototype.animateAdd = function aniScore(val) {
      if(aniScore.animate === false) return;
      
      var scorePlus = this.scorePlus;
      var classBase = 'game__score-plus game__score-plus-';
      
      aniScore.animate = false;
      
      scorePlus.innerText = '+' + val;
      scorePlus.className = classBase + 'start';
      
      setTimeout(function() {
         scorePlus.className = classBase + 'end';
      }, 500);
      
      setTimeout(function() {
         scorePlus.className = classBase + 'passive';
         aniScore.animate = true;
      }, 1200);
      
      return this;
   }
   
   Score.prototype.edit = function (val) {
      this.element.innerText = val;
      
      return this;
   }
   
   Score.prototype.getVal = function () {
      return this.element.innerText;
   }
   
   Score.prototype.createOptions = function(options) {
      this.element = options.element;
      this.scorePlus = options.scorePlus;
      this.start = options.start;
      
      return this;
   }
   
   /** 
    * Конструктор BestScore
    *
    * @param {object} options - настройки. Содержит свойства:
    * {html element} element - элемент для score
    */  

   window.BestScore = function(options) {
      this.createOptions(options);
      this.create();
   }
   
   BestScore.prototype.createOptions = function(options) {
      this.element = options.element;
      
      return this;
   }
   
   BestScore.prototype.create = function() {
      if (this.Storage.get('') === undefined) {
         this.Storage.set('', 0);
      }
      
      this.editVal(this.Storage.get(''));
      
      return this;
   }
   
   BestScore.prototype.add = function(val) {
      if (val > this.getVal()) {
         this.editVal(val);
         this.save();
      }
   }
   
   BestScore.prototype.editVal = function(val) {
      this.element.innerText = val;
      
      return this;
   }
   
   BestScore.prototype.getVal = function() {
      return +this.element.innerText;
   }
   
   BestScore.prototype.save = function() {
      if (+this.Storage.get('') < this.getVal()) {
         this.Storage.set('', this.getVal());
      }
     
      return this;
   }
   
   BestScore.prototype.Storage = new Storage('game2048__bestscore');
   
   /** 
    * Конструктор рандомных чисел
    */
   window.Random = function() {}
   
   //целые в диапазоне [min, max]
   Random.prototype.getInteger = function(min, max) {
      return Math.round(Math.random() * (max - min)) + min; 
   }
   
}());

