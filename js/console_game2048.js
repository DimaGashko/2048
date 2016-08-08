/* script whith defer */

/** 
 * Конструктор игры 2048 (консольконая часть)
 *
 * @param {object} options. Настройки игры. Содержит свойства: 
 * {Game2048} Game - объект визуальной части игры
 * {number} nConsoleTilesStart - начальное количество блоков
 * {number} size - размер игрогого поля
 */

var ConsoleGame2048;
(function() {
   "use strict"
   
   ConsoleGame2048 = function(options) {
      if ( !(this instanceof ConsoleGame2048) ) { 
         return new ConsoleGame2048(options); 
      }
   
      this.createOptions(options);   
      this.createTilesStart();
   }
   
   ConsoleGame2048.prototype.moveRight = function() {
      return this.move('x', this.size);
   }
   
   ConsoleGame2048.prototype.moveLeft = function() {
      return this.move('x', 1);
   }
   
   ConsoleGame2048.prototype.moveTop = function() {
      return this.move('y', 1);
   }
   
   ConsoleGame2048.prototype.moveBottom = function() {
      return this.move('y', this.size);
   }
   
   ConsoleGame2048.prototype.move = function(axis, startValue) {
      var allTiles = this.allConsoleTiles;
      var otherAxis = (axis === 'x') ? 'y' : 'x';
      var minusPos = (startValue === 1) ? -1 : 1;
      this.allIdenticalTiles = [];
      var identical = true;
      var permissionEdit = false;
      var axisStart;
      var ranks = [];
      
      for (var i = 0; i < this.size; i++) {
         ranks[i] = [];
      }
      
      for (var i = 0; i < allTiles.length; i++) {
         ranks[allTiles[i][otherAxis] - 1].push(allTiles[i]);
      }
      
      for (var i = 0; i < ranks.length; i++) {
         ranks[i].sort(function(a, b) {
            return a[axis] - b[axis];
         });
         
         if (startValue === this.size) {
            ranks[i].reverse();
         }
         
         for (var j = 0; j < ranks[i].length; j++) {
            axisStart = ranks[i][j][axis];
            if (ranks[i][j-1]) {
               if (ranks[i][j].n === ranks[i][j-1].n && identical) {
                  ranks[i][j][axis] = ranks[i][j-1][axis];
                  this.allIdenticalTiles.push([ranks[i][j], ranks[i][j-1]]);
                  identical = false;
               } else {
                  ranks[i][j][axis] = ranks[i][j-1][axis] - minusPos;
                  identical = true;
               } 
            } else {
               ranks[i][j][axis] = startValue;
            }
            
            if (!permissionEdit) {
               if (axisStart !== ranks[i][j][axis]) {
                  this.newTilePermission = true;
                  permissionEdit = true;
               } else {
                  this.newTilePermission = false;
               }
            }
          
         }
      }
      
      return this;
   }
   
   ConsoleGame2048.prototype.joinIdentical = function() {
      var identical = this.allIdenticalTiles;
      this.onDeleted = []; this.onAdd = [];
      
      for (var i = 0; i < identical.length; i++) {
         var p = identical[i][1];
         var newTile = this.createOneConsoleTile(p.x, p.y, p.n * 2);
         newTile.merger = true;
         
         this.onAdd.push(newTile);
         this.onDeleted.push(identical[i][0].index, p.index);
         this.removeConsoleTile(identical[i][0], p);
      }
      
      return this;
   }
   
   ConsoleGame2048.prototype.removeConsoleTile = function() {
      for (var i = 0; i < arguments.length; i++) {
         
         for (var j = 0; j < this.allConsoleTiles.length; j++) {
            if (arguments[i].index === this.allConsoleTiles[j].index) {
               this.allConsoleTiles.splice(j, 1);
               break;
            }
         }
      }
      return this;
   }
   
   ConsoleGame2048.prototype.gameOver = function() {
      alert('Game Over');
      
      return this;
   }
   
   ConsoleGame2048.prototype.createTilesStart = function() {
      for (var i = 0; i < this.nConsoleTilesStart; i++) {
         this.createOneConsoleTile();
      }
      
      return this;
   }
   ConsoleGame2048.prototype.createOneConsoleTile = function g(x, y, n) {
      if (!this.newTilePermission && !arguments.length) {
         console.log('no move');
         return;
      } 
   
      var tile = new ConsoleTile(this.getConsoleTileOptions(x, y, n));
      if (tile.created) {
         this.allConsoleTiles.push(tile);
         tile.index = (g.index !== undefined) ? 
            ++g.index : g.index = 0;
            
         return tile;
      }
      return this;
   }
   
   ConsoleGame2048.prototype.getConsoleTileOptions = function(x, y, n) {
      if (x && y && n) {
         return { x: x, y: y, n: n};
      }
      
      var freeCoordinates = this.getFreeCoordinates();
      
      if (!freeCoordinates.length) {
         this.gameOver();
         return false;
      }
      
      var randomN = this.random.getInteger(0, freeCoordinates.length - 1);
      var select = freeCoordinates[randomN].split('|');
      
      var options = {
         x: +select[0],
         y: +select[1],
         n: 2,
      }
      
      return options;
   }
   
   ConsoleGame2048.prototype.getFreeCoordinates = function() {
      var free = [], notFree = this.getNotFreeCoordinates();
      
      for (var i = 1; i <= this.size; i++) {
         for(var j = 1; j <= this.size; j++) {
            var coordinat = i + '|' + j;
            if (!notFree[coordinat]) free.push(coordinat);
         }
      }
      
      return free;
   }
   
   ConsoleGame2048.prototype.getNotFreeCoordinates = function() {
      var notFree = {};
      
      for (var i = 0; i < this.allConsoleTiles.length; i++) {
         notFree[this.allConsoleTiles[i].x + '|' + this.allConsoleTiles[i].y] = true;
      }
      
      return notFree;
   }
   
   ConsoleGame2048.prototype.addTilesUndo = function() {
      var jsonTiles = JSON.stringify(this.allConsoleTiles);
      this.tilesUndo.push(jsonTiles);
   }
   
   ConsoleGame2048.prototype.restart = function() {
      this.allConsoleTiles = [];
      this.tilesUndo = [];
      this.newTilePermission = true;
      this.createTilesStart();
   }
   
   ConsoleGame2048.prototype.undo = function() {
      var lastTiles = this.tilesUndo[this.tilesUndo.length-2];
      this.allConsoleTiles = JSON.parse(lastTiles);
      this.tilesUndo.splice(-1, 1);
   }
   
   ConsoleGame2048.prototype.createOptions = function(options) {
      this.nConsoleTilesStart = options.nConsoleTilesStart || 2,
      this.size = options.size;
      this.undoLen = options.undoLen;
      this.Game = options.Game;
      this.corectOptions();
      
      this.allConsoleTiles = [];
      this.allIdenticalTiles = [];
      this.onDeleted = [];
      this.onAdd = [];    
      this.tilesUndo = [];
      this.newTilePermission = true;
      
      this.random = new Random();
      
      return this;
   }
   
   ConsoleGame2048.prototype.corectOptions = function() {
      if (this.nConsoleTilesStart > this.size * this.size) {
         this.nConsoleTilesStart = this.size * this.size;
      }
      
      return this;
   }
   
}());


