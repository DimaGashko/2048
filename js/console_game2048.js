/** 
 * Конструктор игры 2048 (консольконая часть)
 *
 * @param {object} options. Настройки игры. Содержит свойства: 
 * {number} nConsoleTilesStart - начальное количество блоков
 * {number} size - размер игрогого поля
 */

var ConsoleGame2048;
(function() {
   ConsoleGame2048 = function(options) {
      if ( !(this instanceof ConsoleGame2048) ) { 
         return new ConsoleGame2048(options); 
      }
   
      this.createOptions(options);   
      this.createConsoleTiles(this.nConsoleTilesStart);
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
      var allTiles = this.allConsoleTiles, identical = true;
      var otherAxis = (axis === 'x') ? 'y' : 'x';
      var minusPos = (startValue === 1) ? -1 : 1;
      var allIdenticalTiles = [];
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
            if (ranks[i][j-1]) {
               if (ranks[i][j].n === ranks[i][j-1].n && identical) {
                  ranks[i][j][axis] = ranks[i][j-1][axis];
                  allIdenticalTiles.push([ranks[i][j], ranks[i][j-1]]);
                  identical = false;
               } else {
                  ranks[i][j][axis] = ranks[i][j-1][axis] - minusPos;
                  identical = true;
               } 
            } else {
               ranks[i][j][axis] = startValue;
            }
         }
      }
      
      this.createOneConsoleTile();
      this.joinIdentical(allIdenticalTiles);
      
      return this;
   }
   
   ConsoleGame2048.prototype.joinIdentical = function(identical) {
      this.onDeleted = [];
      for (var i = 0; i < identical.length; i++) {
         var op = identical[i][0];
         this.onDeleted.push(identical[i][0].index);
         this.onDeleted.push(identical[i][1].index);
         
         this.createOneConsoleTile(op.x, op.y, op.n * op.n, true);
         
         console.log(identical[i][0].index, identical[i][1].index)
         this.removeConsoleTile(identical[i][0]);
         this.removeConsoleTile(identical[i][1]);
      }
      
      return this;
   }
   
   ConsoleGame2048.prototype.removeConsoleTile = function(tile) {
      this.allConsoleTiles.splice(tile.index, 1);
      tile = null;
   }
   
   ConsoleGame2048.prototype.gameOver = function() {
      alert('Game Over');
      
      return this;
   }
   
   ConsoleGame2048.prototype.createConsoleTiles = function(n) {
      for (var i = 0; i < n; i++) {
         this.createOneConsoleTile();
      }
      
      return this;
   }
   
   ConsoleGame2048.prototype.createOneConsoleTile = function(x, y, n, merger) {
      var tile = new ConsoleTile(this.getConsoleTileOptions(x, y, n, merger));
      if (tile.created) {
         this.allConsoleTiles.push(tile);
         tile.index = this.allConsoleTiles.length - 1;
      }
      return this;
   }
   
   ConsoleGame2048.prototype.getConsoleTileOptions = function(x, y, n, merger) {
      if (x && y && n) {
         return {
            x: x,
            y: y,
            n: n,
            merger: merger || false,
         }
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
      var coordinat = {}, free = [], notFree = this.getNotFreeCoordinates();
      
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
   
   ConsoleGame2048.prototype.createOptions = function(options) {
      this.nConsoleTilesStart = options.nConsoleTilesStart || 2,
      this.size = options.size;
      
      this.corectOptions();
      
      this.allConsoleTiles = [];
      this.onDeleted = [];
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


