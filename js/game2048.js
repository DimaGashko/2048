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
      this.setTileSpeed();
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
      this.setTileSpeed();
      //Управление стрелками
      document.addEventListener('keyup', function(event) {
         var direction = self.keyDirection[event.keyCode];
         if (direction) self.move(direction);
      });
      
      //Управление свайпами
      document.addEventListener('swipe', function(event) {
         self.move(event.direction);
      });
      
      return self;
   }
   
   Game2048.prototype.move = function(direction) {
      var self = this;
      
      if (direction === 'left') {
         this.consoleGame.moveLeft();
      } else if (direction === 'top') {
         this.consoleGame.moveTop();
      } else if (direction === 'right') {
         this.consoleGame.moveRight();
      } else if (direction === 'bottom') {
         this.consoleGame.moveBottom();
      }
      
      this.updateTiles();
      
      setTimeout(function() {
         self.consoleGame.joinIdentical();
         self.consoleGame.createOneConsoleTile();
         
         setTimeout(function(){
            self.updateTiles()
         });
      }, self.tileSpeed)
      
      return this;
   }
   
   Game2048.prototype.setTileSpeed = function() {
      var testTile = new Tile({});
      var transition = getComputedStyle(testTile.el).transition;
      transition = transition.slice(transition.indexOf(' '));
      testTile.remove();
      
      Game2048.prototype.tileSpeed = parseFloat(transition) * 1000;
      
      return this;
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
            this.updateScore(consoleTiles[i]);
         } else {
            options.parent = this.el.border;
            options.size = tileW;
            this.allTiles[consoleTiles[i].index] = new Tile(options)
         }
      }
      
      for (var i = 0; i < this.consoleGame.onDeleted.length; i++) {
         this.removeTile(this.consoleGame.onDeleted[i]);
      }
   }
   
   Game2048.prototype.updateScore = function(consoleTile) {
      console.log(consoleTile)
      if (consoleTile.merger) {
         this.el.score.innerText = +this.el.score.innerText + +consoleTile.n;
      }
   }
   
   Game2048.prototype.removeTile = function(index) {
      this.el.border.removeChild(this.allTiles[index].el);
      delete this.allTiles[index];
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
   
   Game2048.prototype.keyDirection = {
      37: 'left',
      38: 'top',
      39: 'right',
      40: 'bottom',
   }
   
}());
