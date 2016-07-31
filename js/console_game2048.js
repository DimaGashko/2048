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
   
      this.createOptions(options);                console.time('create');
      this.createConsoleTiles(this.nConsoleTilesStart);         console.timeEnd('create');
   }
   
   ConsoleGame2048.prototype.joinIdenticalConsoleTile = function() {
      for (var i = 0; i < this.identicalConsoleTiles.length; i++) {
         this.removeConsoleTile(this.identicalConsoleTiles[i][0]);
         this.identicalConsoleTiles[i][1].n = 
            Math.pow(this.identicalConsoleTiles[i][1].n, 2);
      }
      
   }
   
   ConsoleGame2048.prototype.removeConsoleTile = function(tile) {
      this.allConsoleTiles.splice(tile.index, 1);
      tile = null;
   }
   
   ConsoleGame2048.prototype.moveRight = function() {
      return this.move('x', this.size);
   }
   
   ConsoleGame2048.prototype.moveLeft = function() {
      return this.move('x', 1);
   }
   
   ConsoleGame2048.prototype.moveTop = function() {
      return this.move('y', this.size);
   }
   
   ConsoleGame2048.prototype.moveBottom = function() {
      return this.move('y', 1);
   }
   
   ConsoleGame2048.prototype.move = function(xOrY, startValue) {
      this.identicalConsoleTiles = [];
      var ranks = [];
      
      for (var i = 0; i < this.size; i++) {
         ranks[i] = [];
      }
      
      for (var i = 0; i < this.allConsoleTiles.length; i++) {
         console.log(this.allConsoleTiles[i]);
         ranks[this.allConsoleTiles[i][xOrY] - 1].push(this.allConsoleTiles[i]);
      }
      
      for (var i = 0; i < ranks.length; i++) {
         ranks[i].sort(function(a, b) {
            return a[xOrY] - b[xOrY];
         });
         
         if (startValue === 1) {
            ranks[i].reverse();
         }
         
         for (var j = 0; j < ranks[i].length; j++) {
            if (ranks[i][j-1]) {
               if (ranks[i][j].n === ranks[i][j-1].n) {
                  if (1) {
                     ranks[i][j][xOrY] = ranks[i][j-1][xOrY];
                     this.identicalConsoleTiles.push([ranks[i][j], ranks[i][j-1]]);
                  }
               } else {
                  ranks[i][j][xOrY] = ranks[i][j-1][xOrY] - 1;
               }
            } else {
               ranks[i][j][xOrY] = startValue;
            }
         }
      }
      
      console.log(ranks);
      this.joinIdenticalConsoleTile();
      this.createOneConsoleTile();
      
      return this;
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
   
   ConsoleGame2048.prototype.createOneConsoleTile = function() {
      var tile = new ConsoleTile(this.getConsoleTileOptions());
      if (tile.created) {
         this.allConsoleTiles.push(tile);
         tile.index = this.allConsoleTiles.length - 1;
      }
      return this;
   }
   
   ConsoleGame2048.prototype.getConsoleTileOptions = function(n) {
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


