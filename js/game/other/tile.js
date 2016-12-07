;(function() {
   'use strict'
   
   /** 
    * Конструктор плиток с числами для игры 2048
    *
    * @param {object} options. Настройки плитки. Содержит свойства: 
    * {number} x, y, n - координаты х, y и значение
    * {html element} parent - родительский элемент
    * {number} size - ширина и высота плитки
    * {number} fontSize - размер шрифта
    */
   function Tile(options) {
      this.createOptions(options);
      this.create();
   }
   
   Tile.prototype.create = function () {
      this.createTile();
      this.setStartStyle();
      
      setTimeout(function() {
         this.setEndStyle();
      }.bind(this), 50);
      
      return this;
   }
   
   Tile.prototype.createTile = function () {
      this.el = document.createElement('div');
      
      this.setClassName(); 
      this.el.innerText = this.n; 
      
      this.parent.appendChild(this.el);
      
      return this;
   }

   Tile.prototype.setStartStyle = function() {
      this.el.style.width = 1 + 'px';
      this.el.style.height = 1 + 'px';
      this.el.style['font-size'] = 1 + 'px';
      this.el.style['line-height'] = 1 + 'px';
      
      this.el.style.left = this.left + this.size / 2 + 'px';
      this.el.style.top = this.top + this.size / 2 + 'px';
         
      this.setTransition();
      return this;
   }
   
   Tile.prototype.setTransition = function() {
      var tileSpeed = this.tileSpeed + 'ms';
      
      this.el.style[vendor + 'Transition'] = 'transform ' + tileSpeed
         + ',left ' + tileSpeed
         + ',top ' + tileSpeed
         + ',width ' + tileSpeed
         + ',height ' + tileSpeed
         + ',line-height ' + tileSpeed
         + ',font-size ' + tileSpeed; 

      return this;
   }
   
   Tile.prototype.setEndStyle = function() {
      this.el.style.width = this.size + 'px';
      this.el.style.height = this.size + 'px';
      this.el.style['line-height'] = this.size + 'px';
      this.el.style['font-size'] = this.fontSize + 'px';
      
      this.el.style.left = this.left + 'px';
      this.el.style.top = this.top + 'px';
      
      return this;
   }
   
   //options = {left, top, n}
   Tile.prototype.update = function(options) {
      this.updateOptions(options);
      
      this.setClassName();
      this.el.style.left = this.left + 'px';
      this.el.style.top = this.top + 'px';
      this.el.innerText = this.n;
      
      return this;
   }
   
   Tile.prototype.updateOptions = function(options) {
      this.left = options.left || this.left;
      this.top = options.top || this.top;
      this.n = options.n || this.n;
      
      return this;
   }
   
   Tile.prototype.setClassName = function() {
      this.el.className = this.CL.base + ' ' +
         this.CL.base + '-' + this.n;
         
      return this;
   }
   
   Tile.prototype.remove = function() {
      this.parent.removeChild(this.el);
   }
   
   Tile.prototype.createOptions = function(options) {
      this.parent = options.parent;
      this.left = options.left;
      this.top = options.top;
      this.n = options.n;
      this.size = options.size;
      this.fontSize = options.fontSize || 20;
      this.tileSpeed = options.tileSpeed || 150;
      
      return this;
   }
   
   Tile.prototype.CL = {
      base: 'game__tile',
   }
   
   window.Game2048.Tile = Tile;
   
}());