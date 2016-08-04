/* script whith defer */

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
   
   Tile.prototype.create = function create(options) {
      this.createOptions(options);
      
      this.el = document.createElement('div');
      this.setClassName();
      
      this.el.innerText = this.n;
      this.el.style['font-size'] = 1 + 'px';
      this.el.style['z-index'] = (create.lastZIndex) ? 
         ++create.lastZIndex : create.lastZIndex = 1;
      
      this.parent.appendChild(this.el);
      
      this.createTileDot();
      
      var self = this;
      setTimeout(function() {
         self.el.style.width = self.size + 'px';
         self.el.style.height = self.size + 'px';
         self.el.style['line-height'] = self.size + 'px';
         self.el.style['font-size'] = '';
         
         self.el.style.left = self.left + 'px';
         self.el.style.top = self.top + 'px';
      });
      
      return this;
   }
   
   Tile.prototype.createTileDot = function(options) {
      this.el.style.width = 1 + 'px';
      this.el.style.height = 1 + 'px';
      this.el.style['line-height'] = 1 + 'px';
      
      this.el.style.left = this.left + this.size / 2 + 'px';
      this.el.style.top = this.top + this.size / 2 + 'px';
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
   
   Tile.prototype.remove = function() {
      this.parent.removeChild(this.el);
   }
   
   Tile.prototype.createOptions = function(options) {
      this.parent = options.parent || document.body;
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
