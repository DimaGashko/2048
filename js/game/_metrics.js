;(function(){
   /**
    * Metrics - метрики для игры 2048
    *
    * @constructor
    */
   var Metrics = function() {}
   
   /**
    * Обновляет значение метрик игры
    *
    * @param {number} size - размер игрового поля
    * @param {html element} border - игровое поле
    */
   Metrics.prototype.update = function(size, border) {
      this.border = border.clientWidth;
      this.cellBorder = this.getCellBorder(size);
      this.widthCell = this.getWidthCell(size);
      this.tileSize = this.getTileSize();
      this.oneCoordinatInPx = this.getOneCoordinatInPx();
      this.fontSize = this.getFontSize();
   }
   
   Metrics.prototype.getTileSize = function() {
      return this.widthCell + this.cellBorder * 2;
   }
   
   Metrics.prototype.getWidthCell = function(size) {
      return this.border / size - this.cellBorder * 2;
   }
   
   Metrics.prototype.getFontSize = function() {
      return this.tileSize * 0.385; //38,5% от плитки
   }
   
   Metrics.prototype.getCellBorder = function(size) {
      if (size < 4) {
         return 3;
      } else if (size < 8) {
         return 2;
      } else {
         return 1;
      }
   }
   
   Metrics.prototype.getOneCoordinatInPx = function() {
      return (this.widthCell + this.cellBorder * 2);
   }
   
   window.Game2048._Metrics = Metrics;
}());