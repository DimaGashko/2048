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
      this._createOptions();
   }
   
   //config = {size, tilesConfig, score, bestScore}
   View.prototype.init = function(config) {      
      this.metrics.update(config.size, this.el.border);
      
      this.createCells(config.size);
      this.updateTiles(config.tilesConfig);
      
      this.score = new Game2048.Score({
         start: config.score,
         element: this.el.score,
         scorePlus: this.el.scorePlus,
      });
      
      this.bestScore = new Game2048.BestScore({
         start: config.bestScore,
         element: this.el.best,
      });
      
      return this;
   }
  
   View.prototype.addEvent = function(type, handler) {
      if (type === 'move') {
         document.addEventListener('keyup', function(event) {
            var direction = this.KEYS[event.keyCode];
            if (direction) handler(direction);
         }.bind(this));
         
      } else if (type === 'restart') {
         this.el.restart.addEventListener('click', function() {
            handler();
         }.bind(this));
         
      }
      
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
            options.tileSpeed = config.tileSpeed;
            
            this.tiles[config.index] = new Game2048.Tile(options);
         }
      }
   }
   
   View.prototype.updateNewTiles = function(onDeleted, onAdd) {
      var scorePlus = 0;
   
      for (var i = 0; i < onDeleted.length; i++) {
         this.removeTile(onDeleted[i]);
      }
      
      for (var i = 0; i < onAdd.length; i++) {
         var now = onAdd[i];
         
         this.tiles[now.index] = new Game2048.Tile({
            parent: this.el.border,
            size: this.metrics.widthCell,
            left: this.getCoordinatInPx(now.x),
            top: this.getCoordinatInPx(now.y),
            fontSize: this.metrics.fontSize,
            tileSpeed: now.tileSpeed,
            n: now.n,
         })
         
         if (now.merger) scorePlus += now.n;
      }
      
      if (scorePlus) this.updateScore(scorePlus);
      
      return this;
   }
   
   View.prototype.updateScore = function(n) {
      this.score.add(n);
      this.bestScore.add(this.score.n);
      
      return this;
   }
   
   View.prototype.removeTile = function(index) {
      if (this.tiles[index]) {
         this.tiles[index].remove();
         delete this.tiles[index];
      }
      
      return this;
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
   
   View.prototype.KEYS = {
      37: 'left',
      38: 'top',
      39: 'right',
      40: 'bottom',
   }

   window.Game2048._View = View;

}()); 