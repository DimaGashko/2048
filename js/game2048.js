/* script whith defer */

/** 
 * Конструктор игры 2048 (визуальная часть)
 *
 * @param {object} options. Настройки игры. Содержит свойства: 
 * {number} nConsoleTilesStart - начальное количество блоков
 * {number} size - размер игрогого поля
 */

var Game2048;
(function(){
   "use strict"

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
      this.el.scorePlus = g.getElementsByClassName('game__score-plus')[0];
      this.el.best = g.getElementsByClassName('game__best-n')[0];
      this.el.restart = g.getElementsByClassName('game__reastart')[0];
      this.el.undo = g.getElementsByClassName('game__undo')[0];
      this.el.border = g.getElementsByClassName('game__border')[0];
   }
   
   Game2048.prototype.updateMetrics = function() {
      var metrics = Game2048.prototype.metrics = {};
      
      metrics.border = this.el.border.clientWidth;
      metrics.cellBorder = this.getCellBorder();
      metrics.widthCell = this.getWidthCell();
      metrics.tileSize = this.getTileSize();
      metrics.oneCoordinatInPx = this.getOneCoordinatInPx();
   }
   
   Game2048.prototype.getTileSize = function() {
      return this.metrics.widthCell + 
         this.metrics.cellBorder * 2;
   }
   
   Game2048.prototype.getWidthCell = function() {
      return this.metrics.border / this.size - 
         this.metrics.cellBorder * 2;
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
   
   Game2048.prototype.getOneCoordinatInPx = function() {
      return (this.metrics.widthCell + 
         this.metrics.cellBorder * 2);
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
      
      return this;
   }
   
   Game2048.prototype.initEvents = function() {
      var self = this;
      
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
         
         var newTile = self.consoleGame.createOneConsoleTile();
         if (newTile) self.consoleGame.onAdd.push(newTile);
         
         setTimeout(function(){
            self.updateNewTiles();
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
      
      for (var i = 0; i < consoleTiles.length; i++) {
         var options = {
            left: this.parseCoordinatInPx(consoleTiles[i].x),
            top: this.parseCoordinatInPx(consoleTiles[i].y),
            n: consoleTiles[i].n,
         }
      
         if (this.allTiles[consoleTiles[i].index] !== undefined) {
            this.allTiles[consoleTiles[i].index].update(options);
         } else {
            options.parent = this.el.border;
            options.size = this.metrics.widthCell;
            this.allTiles[consoleTiles[i].index] = new Tile(options)
         }
      }
   }
   
   Game2048.prototype.updateNewTiles = function() {
      var scorePlus = 0;
   
      for (var i = 0; i < this.consoleGame.onDeleted.length; i++) {
         this.removeTile(this.consoleGame.onDeleted[i]);
      }
      
      for (var i = 0; i < this.consoleGame.onAdd.length; i++) {
         var now = this.consoleGame.onAdd[i];
         
         this.allTiles[now.index] = new Tile({
            parent: this.el.border,
            size: this.metrics.widthCell,
            left: this.parseCoordinatInPx(now.x),
            top: this.parseCoordinatInPx(now.y),
            n: now.n,
         })
         
         if (now.merger) scorePlus += now.n;
      }
      
      if (scorePlus) this.updateScore(scorePlus);
      
      return this;
   }
   
   Game2048.prototype.parseCoordinatInPx = function(coordinat) {
      return (coordinat - 1) * this.metrics.oneCoordinatInPx +
         this.metrics.cellBorder;
   }
   
   Game2048.prototype.updateScore = function(n) {
      this.el.score.innerText = +this.el.score.innerText + +n;
      
      this.animateUpdateScore(n);
   }
   
   Game2048.prototype.animateUpdateScore = function aniScore(n) {
      if(aniScore.animate === false) return;
      
      var self = this, scorePlus = this.el.scorePlus;
      var classBase = 'game__score-plus game__score-plus-';
      
      aniScore.animate = false;
      
      scorePlus.innerText = '+' + n;
      scorePlus.className = classBase + 'start';
      
      setTimeout(function() {
         scorePlus.className = classBase + 'end';
      }, 500);
      
      setTimeout(function() {
         scorePlus.className = classBase + 'passive';
         aniScore.animate = true;
      }, 1200);
   }
   
   Game2048.prototype.removeTile = function(index) {
      if (this.allTiles[index]) {
         this.allTiles[index].remove();
         delete this.allTiles[index];
      }
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
