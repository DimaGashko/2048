/** 
 * Конструктор плиток с числами для игры 2048
 *
 * @param {object} options. Настройки плитки. Содержит свойства: 
 * {number} x, y, n - соответствено координаты х, y и значение
 * {html element} parent - родительский элемент
 * {number} size - ширина и высота плитки
 */
var Tile;
(function() {
   Tile = function(options) {
      this.create(options);
   }
   
   Tile.prototype.create = function(options) {
      this.createOptions(options);
      
      this.el = document.createElement('div');
      this.setClassName();
      this.el.style.left = this.left + 'px';
      this.el.style.top = this.top + 'px';
      this.el.innerText = this.n;
      
      this.el.style.width = this.size + 'px';
      this.el.style.height = this.size + 'px';
      this.el.style['line-height'] = this.size + 'px';
      
      this.parent.appendChild(this.el);
      
      return this;
   }
   
   //options {left, top, n}
   Tile.prototype.update = function(options) {
      this.updateOptions(options.left, options.top, options.n);
      
      this.setClassName();
      this.el.style.left = this.left + 'px';
      this.el.style.top = this.top + 'px';
      this.el.innerText = this.n;
   }
   
   Tile.prototype.setClassName = function() {
      this.el.className = this.CLASSES.base + ' ' +
         this.CLASSES.base + '-' + this.n;
   }
   
   Tile.prototype.updateOptions = function(left, top, n) {
      this.left = left || this.left;
      this.top = top || this.top;
      this.n = n || this.n;
      
      return this;
   }
   
   Tile.prototype.createOptions = function(options) {
      this.parent = options.parent;
      this.left = options.left;
      this.top = options.top;
      this.n = options.n;
      this.size = options.size;
      
      return this;
   }
   
   Tile.prototype.CLASSES = {
      base: 'game__tile',
   }
   
}());

/** 
 * Конструктор плиток с числами для игры 2048 (Консольный вариант)
 *
 * @param {object} options. Настройки плитки. Содержит свойства: 
 * {number} x, y, n - соответствено координаты х, y и значение
 */
var ConsoleTile;
(function() {
   ConsoleTile = function(options) {
      this.create(options);
   }
   
   ConsoleTile.prototype.create = function(options) {
      this.createOptions(options);
      
      return this;
   }
   
   ConsoleTile.prototype.createOptions = function(options) {
      if (options === false) {
         this.created = false;
         return;
      };
      
      this.x = options.x || 1;
      this.y = options.y || 1;
      this.n = options.n || 2;
      
      this.created = true;
      return this;
   }
   
   ConsoleTile.prototype.editeX = function(x) {
      this.x = x;
   }
   
   ConsoleTile.prototype.editeY = function(y) {
      this.y = y;
   }
   
   ConsoleTile.prototype.editeN = function(n) {
      this.n = n;
   }
   
}());

/** 
 * Возвращяет html ячейки для игры 2048
 */
function getCellHTML (size, borderWidth) {
   return '<div class="game__cell" style="width: ' +
      size + 'px; height: ' + size + 'px; border-width: ' 
      + borderWidth + 'px"></div>';
}

/** 
 * Конструктор рандомных чисел
 *
 * @param {object} options. Настройки игры. Содержит свойства: 
 * {number} x, y, n - соответствено координаты х, y и значение
 */
var Random;
(function() {
   Random = function(options) {}
   
   //целые в диапазоне [min, max]
   Random.prototype.getInteger = function(min, max) {
      return Math.round(Math.random() * (max - min)) + min; 
   }
}());
