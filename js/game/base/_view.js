﻿;(function(){
   "use strict"
   
   /**
    * Игра "2048" - работа со страницей
    * 
    * @constructor
    */
   function View(metrics) {
      this.metrics = metrics;
      
      this._getHTMLElements();
      this._createOptions();
   }
   
   View.prototype.init = function(size, tilesConfig) {      
      this.metrics.update(size, this.el.border);
      
      this.createCells(size);
      this.updateTiles(tilesConfig);
      
      return this;
   }
  
   View.prototype.updateTiles = function(tilesConfig) {
      for (var i = 0; i < tilesConfig.length; i++) {
         var config = tilesConfig[i];
         
         var options = {
            left: this.getCoordinatInPx(config.x),
            top: this.getCoordinatInPx(config.y),
            n: config.n,
         }
         
         if (config.index in this.tiles) {
            this.tiles[config.index].update(options);
            
         } else {
            options.parent = this.el.border;
            options.size = this.metrics.widthCell;
            options.fontSize = this.metrics.fontSize;
            
            this.tiles[config.index] = new Game2048.Tile(options);
         }
      }
   }
   
   View.prototype.getCoordinatInPx = function(coordinat) {
      return (coordinat - 1) * this.metrics.oneCoordinatInPx +
         this.metrics.cellBorder;
   }
   
   View.prototype.createCells = function(size) { 
      this.el.border.innerHTML = this.getCellsHTML(size);
      return this;
   }
   
   View.prototype.getCellsHTML = function cellsHTML(size) {
      if (cellsHTML[size]) return cellsHTML[size];
      
      var m = this.metrics;
      var html = '';
      
      for (var i = 0; i < size * size; i++) {
         html += '<div class="game__cell" style="'
            + 'width:' + m.widthCell + 'px;' 
            + 'height:' + m.widthCell + 'px;'
            + 'border-width:' + m.cellBorder + 'px"></div>';
      }
      
      cellsHTML[size] = html;
      
      return html;
   } 
   
   View.prototype._getHTMLElements = function() {
      this.el = {} //this.el.* - html elements
      
      var g = this.el.game = document.getElementById('game');
      this.el.set = g.querySelector('.game__set-top');
      this.el.score = g.querySelector('.game__score-n');
      this.el.scorePlus = g.querySelector('.game__score-plus');
      this.el.best = g.querySelector('.game__best-n');
      this.el.restart = g.querySelector('.game__reastart');
      this.el.undo = g.querySelector('.game__undo');
      this.el.border = g.querySelector('.game__border');
   }   
   
   View.prototype._createOptions = function() {
      this.tiles = [];
      
      return this;
   }

   window.Game2048._View = View;

}()); 