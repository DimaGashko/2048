/** 
 * Конструктор плиток с числами для игры 2048
 *
 * @param {object} options. Настройки игры. Содержит свойства: 
 * {number} x, y, n - соответствено координаты х, y и значение
 */
var Tile;
(function() {
   Tile = function(options) {
      this.create(options);
   }
   
   Tile.prototype.create = function(options) {
      this.createOptions(options);
      
      return this;
   }
   
   Tile.prototype.createOptions = function(options) {
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
   
   Tile.prototype.editeX = function(x) {
      this.x = x;
   }
   
   Tile.prototype.editeY = function(y) {
      this.y = y;
   }
   
   Tile.prototype.editeN = function(n) {
      this.n = n;
   }
   
}());


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
