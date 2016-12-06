;(function(){
   "use strict"
   
   /**
    * Игра "2048" - работа со страницей
    * 
    * @constructor
    */
   function View(metrics) {
      this.metrics = metrics;
      
      this._getHTMLElements();
   }
   
   View.prototype.init = function(size) {      
      this.metrics.update(size, this.el.border);
      this.create(size);
      
      return this;
   }
   
   View.prototype.create = function(size) {
      this.createCells(size);
      
      return this;
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

   window.Game2048._View = View;

}()); 