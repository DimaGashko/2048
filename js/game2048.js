/** 
 * Конструктор игры 2048 (визуальная часть)
 *
 * @param {object} options. Настройки игры. Содержит свойства: 
 * {number} nConsoleTilesStart - начальное количество блоков
 * {number} size - размер игрогого поля
 */

var Game2048;
(function(){
   Game2048 = function(options) {
      if ( !(this instanceof Game2048) ) { 
         return new Game2048(options); 
      }
      
      this.createOptions(options);
      this.getHTMLElements();
      this.updateMetrics();
      this.create();
      this.initEvents();
   }
   
   Game2048.prototype.getHTMLElements = function() {
      this.el = {} //this.el.* - html elements
      
      var g = this.el.game = document.getElementById('game');
      this.el.set = g.getElementsByClassName('game__set-top')[0];
      this.el.score = g.getElementsByClassName('game__score-n')[0];
      this.el.best = g.getElementsByClassName('game__best-n')[0];
      this.el.restart = g.getElementsByClassName('game__reastart')[0];
      this.el.undo = g.getElementsByClassName('game__undo')[0];
      this.el.border = g.getElementsByClassName('game__border')[0];
   }
   
   Game2048.prototype.updateMetrics = function() {
      var metrics = Game2048.prototype.metrics = {};
      
      metrics.border = this.el.border.clientWidth;
      metrics.cellBorder = this.getCellBorder();
      metrics.widthCell = metrics.border / this.size - 
         metrics.cellBorder * 2;
      metrics.tileSize = metrics.widthCell + 
         metrics.cellBorder * 2;
   }
   
   Game2048.prototype.create = function() {
      this.createCells();
      this.updateTiles();
      
      return this;
   }
   
   Game2048.prototype.createCells = function() {
      var size = this.metrics.widthCell;
      var border = this.metrics.cellBorder;
      
      for (var i = 0, html = ''; i < this.size * this.size; i++) {
         html += getCellHTML(size, border);
      }
      this.el.border.innerHTML = html;
   }
   
   Game2048.prototype.getCellBorder = function() {
      if (this.size < 4) {
         return 3;
      } else if (this.size < 8) {
         return 2;
      } else {
         return 1;
      }
   }
   
   Game2048.prototype.initEvents = function() {
      var self = this;
      
      //Управление стрелками
      document.addEventListener('keyup', function(event) {
         var keyCode = event.keyCode;
         if (keyCode === 37) {
            self.consoleGame.moveLeft();
            self.updateTiles();
         } else if (keyCode === 38) {
            self.consoleGame.moveTop();
            self.updateTiles();
         } else if (keyCode === 39) {
            self.consoleGame.moveRight();
            self.updateTiles();
         } else if (keyCode === 40) {
            self.consoleGame.moveBottom();
            self.updateTiles();
         }
      });
      
      //Управление свайпами
      document.addEventListener('swipe', function(event) {
         var direction = event.direction;
         if (direction === 'left') {
            self.consoleGame.moveLeft();
         } else if (direction === 'top') {
            self.consoleGame.moveTop();
         } else if (direction === 'right') {
            self.consoleGame.moveRight();
         } else if (direction === 'bottom') {
            self.consoleGame.moveBottom();
         }
         
         self.updateTiles();
      });
   }
   
   Game2048.prototype.updateTiles = function() {
      var consoleTiles = this.consoleGame.allConsoleTiles;
      var tileW = this.metrics.widthCell;
      var cellB = this.metrics.cellBorder;
      
      for (var i = 0; i < consoleTiles.length; i++) {
         options = {
            left: (consoleTiles[i].x - 1) * (tileW + cellB * 2) + cellB ,
            top: (consoleTiles[i].y - 1) * (tileW  + cellB * 2) + cellB,
            n: consoleTiles[i].n,
         }
      
         if (this.allTiles[consoleTiles[i].index] !== undefined) {
            this.allTiles[consoleTiles[i].index].update(options);
            this.updateScore(options.n);
         } else {
            options.parent = this.el.border;
            options.size = tileW;
            this.allTiles[consoleTiles[i].index] = new Tile(options)
         }
      }
   }
   
   Game2048.prototype.updateScore = function(plusN) {
      this.el.score.innerText = +this.el.score.innerText + +plusN;
   }
   
   Game2048.prototype.createOptions = function(options) {
      this.nTilesStart = options.nTilesStart || 2,
      this.size = options.size;
      
      this.corectOptions();
      this.createConsoleGame();
      
      this.allTiles = {};
      
      return this;
   }
   
   Game2048.prototype.corectOptions = function(options) {
      if (this.size > 20) {
         this.size = 20;
      } else if (this.size < 2) {
         this.size = 2;
      }
      
      return this;
   }
   
   Game2048.prototype.createConsoleGame = function() {
      var self = this;
      self.consoleGame = new ConsoleGame2048({
         nConsoleTilesStart: self.nTilesStart,
         size: self.size, 
      })
   }
   
}());
