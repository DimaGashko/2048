;(function(){
   /**
    * Metrics - метрики для игры
    *
    * @param {object} Game - ссылка на Game2048
    */
   var Metrics = function(Game) {
      this.Game = Game
      this.metrics = {};
      this.updateMetrics();
   }
   
   Metrics.prototype.updateMetrics = function(){
      var m = this.metrics;
      
      m.border = this.Game.el.border.clientWidth;
      m.cellBorder = this.getCellBorder();
      m.widthCell = this.getWidthCell();
      m.tileSize = this.getTileSize();
      m.oneCoordinatInPx = this.getOneCoordinatInPx();
      m.fontSize = this.getFontSize();
   }
   
   Metrics.prototype.getTileSize = function() {
      return this.metrics.widthCell + 
         this.metrics.cellBorder * 2;
   }
   
   Metrics.prototype.getWidthCell = function() {
      return this.metrics.border / this.Game.size - 
         this.metrics.cellBorder * 2;
   }
   
   Metrics.prototype.getFontSize = function() {
      //Шрифт равер 38,5% от размеров плитки
      return this.metrics.tileSize * 0.385;
   }
   
   Metrics.prototype.getCellBorder = function() {
      if (this.Game.size < 4) {
         return 3;
      } else if (this.Game.size < 8) {
         return 2;
      } else {
         return 1;
      }
   }
   
   Metrics.prototype.getOneCoordinatInPx = function() {
      return (this.metrics.widthCell + 
         this.metrics.cellBorder * 2);
   }
   
   window.Metrics = Metrics;
}());