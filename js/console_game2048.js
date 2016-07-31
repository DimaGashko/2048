﻿/** 
 * Конструктор игры 2048 (консольконая часть)
 *
 * @param {object} options. Настройки игры. Содержит свойства: 
 * {number} nTilesStart - начальное количество блоков
 * {number} size - размер игрогого поля
 */

var ConsoleGame2048;
(function() {
   ConsoleGame2048 = function(options) {
      if ( !(this instanceof ConsoleGame2048) ) { 
         return new ConsoleGame2048(options); 
      }
   
      this.createOptions(options);                console.time('create');
      this.createTiles(this.nTilesStart);         console.timeEnd('create');
   }
   
   ConsoleGame2048.prototype.joinIdenticalTile = function() {
      for (var i = 0; i < this.identicalTiles.length; i++) {
         this.removeTile(this.identicalTiles[i][0]);
         this.identicalTiles[i][1].n = 
            Math.pow(this.identicalTiles[i][1].n, 2);
      }
      
   }
   
   ConsoleGame2048.prototype.removeTile = function(tile) {
      this.allTiles.splice(tile.index, 1);
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
      this.identicalTiles = [];
      var ranks = [];
      
      for (var i = 0; i < this.size; i++) {
         ranks[i] = [];
      }
      
      for (var i = 0; i < this.allTiles.length; i++) {
         console.log(this.allTiles[i]);
         ranks[this.allTiles[i][xOrY] - 1].push(this.allTiles[i]);
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
                     this.identicalTiles.push([ranks[i][j], ranks[i][j-1]]);
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
      this.joinIdenticalTile();
      this.createOneTile();
      
      return this;
   }
   
   ConsoleGame2048.prototype.gameOver = function() {
      alert('Game Over');
      
      return this;
   }
   
   ConsoleGame2048.prototype.createTiles = function(n) {
      for (var i = 0; i < n; i++) {
         this.createOneTile();
      }
      
      return this;
   }
   
   ConsoleGame2048.prototype.createOneTile = function() {
      var tile = new Tile(this.getTileOptions());
      if (tile.created) {
         this.allTiles.push(tile);
         tile.index = this.allTiles.length - 1;
      }
      return this;
   }
   
   ConsoleGame2048.prototype.getTileOptions = function(n) {
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
      
      for (var i = 0; i < this.allTiles.length; i++) {
         notFree[this.allTiles[i].x + '|' + this.allTiles[i].y] = true;
      }
      
      return notFree;
   }
   
   ConsoleGame2048.prototype.createOptions = function(options) {
      this.nTilesStart = options.nTilesStart || 2,
      this.size = options.size;
      
      this.corectOptions();
      
      this.allTiles = [];
      this.random = new Random();
      
      return this;
   }
   
   ConsoleGame2048.prototype.corectOptions = function() {
      if (this.nTilesStart > this.size * this.size) {
         this.nTilesStart = this.size * this.size;
      }
      
      return this;
   }
   
}());

