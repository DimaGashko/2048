/* script whith defer */

/** 
 * Конструктор игры 2048 (визуальная часть)
 *
 * @param {object} options. Настройки игры. Содержит свойства: 
 * {number} nConsoleTilesStart - начальное количество блоков
 * {number} size - размер игрогого поля
 */

(function(){
   "use strict"

   window.Game2048 = function(options) {
      if ( !(this instanceof Game2048) ) { 
         return new Game2048(options); 
      }
      
      
      this.getHTMLElements();
      this.createOptions(options);
      this.updateMetrics();
      this.addOptions();
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
      var m = Game2048.prototype.metrics = {};
      
      m.border = this.el.border.clientWidth;
      m.cellBorder = this.getCellBorder();
      m.widthCell = this.getWidthCell();
      m.tileSize = this.getTileSize();
      m.oneCoordinatInPx = this.getOneCoordinatInPx();
      m.fontSize = this.getFontSize();
      
      return this;
   }
   
   Game2048.prototype.getTileSize = function() {
      return this.metrics.widthCell + 
         this.metrics.cellBorder * 2;
   }
   
   Game2048.prototype.getWidthCell = function() {
      return this.metrics.border / this.size - 
         this.metrics.cellBorder * 2;
   }
   
   Game2048.prototype.getFontSize = function() {
      //Шрифт равер 38,5% от размеров плитки
      return this.metrics.tileSize * 0.385;
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
      this.corectTextElUndo();
      this.createCells();
      this.updateTiles();
      
      return this;
   }
   
   Game2048.prototype.addOptions = function() {
      this.setTileSpeed();
      this.getUndoText();
   }
  
   Game2048.prototype.getUndoText = function() {
      this.undoText = this.el.undo.innerText;
   }
   
   Game2048.prototype.createCells = function() {
      for (var i = 0, html = ''; i < this.size * this.size; i++) {
         html += this.getCellHTML();
      }
      this.el.border.innerHTML = html;
      this.cellsHTML = html;
      
      return this;
   }
   
   Game2048.prototype.getCellHTML = function() {
   return '<div class="game__cell" style="width: ' +
      this.metrics.widthCell + 'px; height: ' + 
      this.metrics.widthCell + 'px; border-width: ' + 
      this.metrics.cellBorder + 'px"></div>';
   }
   
   Game2048.prototype.corectTextElUndo = function() {
      this.el.undo.innerText = this.undoText + ' (' + this.restUndo + ')';
   }  
   
   Game2048.prototype.initEvents = function() {
      var self = this;
      
      //Управление стрелками
      document.addEventListener('keyup', function(event) {
         self.move(self.keyDirection[event.keyCode]);
      });
      
      //Управление свайпами
      document.addEventListener('swipe', function(event) {
         self.move(event.direction);
      });
      
      //restart
      this.el.restart.addEventListener('click', function() {
         console.log('restart') 
         self.restart();
      });
      
      //undo
      this.el.undo.addEventListener('click', function() {
         if (self.restUndo) {
            console.log('undo')
            self.undo();
         }      
         else {
            console.log('undo ended');
         }          
      });
      
      //show menu 
      this.el.set.addEventListener('click', function() {
         self.getMenu().show();
      });
      
      return self;
   }
   
   Game2048.prototype.move = function(direction) {
      var check = !this.moving || !direction || 
         this.gameLosing || this.gamePaused;
         
      if (check) {
         return this;
      }
      
      this.moving = false;
      
      this.consoleGame.moveDirection(direction);
      this.updateTiles();
      
      if (this.consoleGame.newTilePermission) {
         setTimeout(function() {
            this.moveAfter();
         }.bind(this), this.tileSpeed);
      }
      
      setTimeout(function() {
         this.moving = true;
      }.bind(this), this.tileSpeed);
      
      return this;
   }
   
   Game2048.prototype.moveAfter = function() {
      this.consoleGame.joinIdentical();
            
      var newTile = this.consoleGame.createOneConsoleTile();
      this.consoleGame.onAdd.push(newTile);
      
      this.updateNewTiles();
      
      if (this.restUndo) {
         this.addUndo();
      }
      
      if (this.consoleGame.checkGameOver()){
         this.gameOver();
      }
   }
   
   Game2048.prototype.checkCombo = function(tile) {
      if (this['combo_' + tile.n]) {
         this['combo_' + tile.n]();
      }
      
      return this;
   }
   
   Game2048.prototype.combo_2048 = function() {
      if (this.won === false) { 
         setTimeout(this.gameWin.bind(this), this.tileSpeed);
         this.won = true;
      }
      
      return this;
   }
   
   Game2048.prototype.combo_4096 = function() {
      this.Combo.show('Monster');
   }
   
   Game2048.prototype.combo_8096 = function() {
      this.Combo.show('Kiborg');
   }
   
   Game2048.prototype.gameOver = function() {
      if (!this.ClassGameOver) {
         this.ClassGameOver = new GameOver({
            restart: this.restart.bind(this),
         })
      }
      
      this.ClassGameOver.show();
      this.gameLosing = true;
      
      return this;
   }
   
   Game2048.prototype.gameWin = function() {
      if (!this.ClassYouWin) {
         this.ClassYouWin = new YouWin({
            restart: this.restart.bind(this),
            afterHide: function() {
               console.log('end')
               this.gamePaused = false;
            }.bind(this),
         })
      }
      
      this.gamePaused = true;
      this.ClassYouWin.show();
   }
   
   
   Game2048.prototype.addUndo = function() {
      this.consoleGame.addTilesUndo();
      this.lastScores.push(this.Score.getVal());
      
      return this;
   }
   
   Game2048.prototype.undo = function() {
      if (this.checkUndo()) {
         this.restUndo--;
         this.corectTextElUndo();
         this.restScore();
         this.consoleGame.undo();
         this.clearTiles();
         this.updateTiles();
      }
      
      return this;
   }
   
   Game2048.prototype.restart = function() {
      this.createOtherOptions();
      this.clearTiles();
      this.consoleGame.restart();
      this.updateMetrics();
      this.create();
      
      return this;
   }
   
   Game2048.prototype.checkUndo = function() {
      return this.consoleGame.tilesUndo.length >= 2 && 
         !this.gameLosing;
   }
   
   Game2048.prototype.restScore = function() {
      var lastText = this.lastScores[this.lastScores.length - 2];
      this.Score.edit(lastText);
      this.lastScores.splice(-1, 1);
   }
   
   Game2048.prototype.clearTiles = function() {
      this.el.border.innerHTML = this.cellsHTML;
      this.allTiles = {};
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
            options.fontSize = this.metrics.fontSize;
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
            fontSize: this.metrics.fontSize,
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
      this.Score.add(n);
      this.BestScore.add(this.Score.getVal());
      
      return this;
   }
   
   Game2048.prototype.removeTile = function(index) {
      if (this.allTiles[index]) {
         this.allTiles[index].remove();
         delete this.allTiles[index];
      }
   }
   
   Game2048.prototype.createOptions = function(options) {
      this.createBaseOptions(options);
      this.createOtherOptions();
      
      return this;
   }
   
   Game2048.prototype.createBaseOptions = function(options) {
      this.nTilesStart = options.nTilesStart || 2,
      this.size = options.size;
      this.undoLen = options.undoLen;
      
      this.corectOptions();
      this.createConsoleGame();
      this.Combo = new Combo({delay: 3000});
      
      return this;
   }
   
   Game2048.prototype.createOtherOptions = function() {
      this.moving = true;
      this.restUndo = this.undoLen;
      this.lastScores = [];
      this.allTiles = {};
      this.gameLosing = false; 
      this.won = false;
      this.gamePaused = false;
      this.createOtherConstructors();
      
      return this;
   }
   
   Game2048.prototype.createOtherConstructors = function () {
      this.Score = new Score({
         element: this.el.score,
         scorePlus: this.el.scorePlus,
      });
      
      this.BestScore = new BestScore({
         element: this.el.best,
      })
   }
   
   Game2048.prototype.corectOptions = function() {
      if (this.size > 20) {
         this.size = 20;
      } else if (this.size < 2) {
         this.size = 2;
      }
      
      this.undoLen = (this.undoLen >= 0) ? this.undoLen : 0;
      
      return this;
   }
   
   Game2048.prototype.createConsoleGame = function() {
      this.consoleGame = new ConsoleGame2048({
         Game: this,
         nConsoleTilesStart: this.nTilesStart,
         size: this.size, 
         undoLen: this.undoLen,
      })
   }
   
   Game2048.prototype.getMenu = function() {
      if (this.Menu) return this.Menu;
      var self = this;
      
      this.Menu = new Menu();
      
      this.Menu.addItem('Continue');

      this.Menu.addItem('Restart', function() {
         self.restart();
      });

      this.Menu.addItem('Settings', function() {
         self.getSettings().show();
      });
      
      return this.Menu; 
   }

   Game2048.prototype.getSettings = function() {
      var self = this;
      if (self.Settings) return self.Settings;
      
      self.Settings = new Menu({
         containerClassName: 'game__setings',
      });
      
      self.Settings.addItem('Continue');
      
      self.Settings.addItem('Size: ' + self.size, function() {
         var pr = self.getPrompt();
         pr.onHide = function() {
            self.Settings.show();
            self.size = +pr.getVal();
            self.consoleGame.size = self.size;
            console.log(+pr.getVal());
            self.restart();
         }
         pr.show(self.size);
      });

      self.Settings.addItem('Undo: 5');
      
      self.Settings.addItem('Tiles start: 5');

      self.Settings.addItem('Back', function() {
         self.Menu.show();
      });
      
      return self.Settings; 
   }
   
   Game2048.prototype.getPrompt = function() {
      if (this.Prompt) return this.Prompt;
      
      return this.Propmt = new Prompt({});
   }
   
   Game2048.prototype.keyDirection = {
      37: 'left',
      38: 'top',
      39: 'right',
      40: 'bottom',
   }
   
}());
