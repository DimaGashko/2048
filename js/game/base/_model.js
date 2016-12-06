;(function(){
   "use strict"
   
   /**
    * Игра "2048" - работа с данными
    * 
    * @constructor
    * @param {object} options - опции
    * @param {object} store - экземпляр Store
    */
   function Model(store) {
      this.store = store;
      this.data = this.store.data;
      
      this.createOptions();
      this.create();
   }
   
   Model.prototype.move = function(direction) { 
      this.addStep();
   
      var size = this.data.set.size;
      
      var startTiles = JSON.stringify(this.getTiles());
      
      if (direction === 'left') {
         this._moveTiles('x', 1);
         
      } else if (direction === 'top') {
         this._moveTiles('y', 1);
         
      } else if (direction === 'right') {
         this._moveTiles('x', size);
         
      } else if (direction === 'bottom') {
         this._moveTiles('y', size);
         
      } 
      
      var endTiles = JSON.stringify(this.getTiles());
      this.data.statuses.change = (startTiles === endTiles);
      
      return this;
   }
   
   Model.prototype._moveTiles = function(axis, startValue) {
      this.identicalTiles = [];
      
      var tiles = this.getTiles();
      var otherAxis = (axis === 'x') ? 'y' : 'x';
      var minusPos = (startValue === 1) ? -1 : 1;
      var size = this.data.set.size;
      
      var ranks = [];
      
      for (var i = 0; i < tiles.length; i++) {
         var index = tiles[i][otherAxis] - 1;
         
         ranks[index] = ranks[index] || [];
         ranks[index].push(tiles[i]);
      }
      
      for (var i = 0; i < ranks.length; i++) {
         if (!ranks[i]) return;
         
         ranks[i].sort(function(a, b) {
            return a[axis] - b[axis];
         });
         
         if (startValue === size) {
            ranks[i].reverse();
         }
         
         var identical = true;
         
         for (var j = 0; j < ranks[i].length; j++) {
            var axisStart = ranks[i][j][axis];
            
            if (ranks[i][j-1]) {
               if (ranks[i][j].n === ranks[i][j-1].n && identical) {
                  ranks[i][j][axis] = ranks[i][j-1][axis];
                  this.identicalTiles.push([ranks[i][j], ranks[i][j-1]]);
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
      
      return this;
   }
   
   Model.prototype.addStep = function() {
      var steps = this.data.steps;
      
      var newStep = JSON.stringify(steps[steps.length - 1]);
      steps.push(JSON.parse(newStep));
   }
   
   Model.prototype.create = function() {
      if (!this.data.steps.length < 2) {
         this.data.steps = [[]];
         this.createTilesStart();
      }
   }
   
   Model.prototype.createTilesStart = function() {
      for (var i = 0; i < this.data.set.nTilesStart; i++) {
         this.addTile();
      }
      
      return this;
   }
   
   /**
    * Добавляет новую плитку в this.tiles
    */
   Model.prototype.addTile = function() {
      var coordinates = this.getAvailableCoordinates();
      
      if (!coordinates.length) return false;
      
      var randomN = getRandomNumber(0, coordinates.length - 1);
      var select = coordinates[randomN].split('|');
      
      var tile = {
         index: ++this.maxIndex,
         tileSpeed: this.store.options.tileSpeed,
         x: +select[0],
         y: +select[1],
         n: 2,
      }
      
      this.getTiles().push(tile);
   }
   
   /**
    * Возвращает объект координат, на которых плиток еще нет
    * Возвращаемый объект имеет вид: {'x1|y1': true, ...}
    */
   Model.prototype.getAvailableCoordinates = function() {
      var notAvailable = this.getNotAvailableCoordinates();
      var size = this.data.set.size;
      var available = [];
      
      for (var i = 1; i <= size; i++) {
         for (var j = 1; j <= size; j++) {
            
            var coordinat = i + '|' + j;
            
            if (!notAvailable[coordinat]) {
               available.push(coordinat);
            }
            
         }
      }
      
      return available;
   }
   
   /**
    * Возвращает объект координат, на которых уже есть плитки
    * Возвращаемый объект имеет вид: {'x1|y1': true, ...}
    */
   Model.prototype.getNotAvailableCoordinates = function() {
      var tiles = this.getTiles();
      var notAvailable = {};
      
      for (var i = 0; i < tiles.length; i++) {
         notAvailable[tiles[i].x + '|' + tiles[i].y] = true;
      }
      
      return notAvailable;
   }
   
   Model.prototype.getTiles = function() {
      return this.data.steps[this.data.steps.length - 1];
   }
   
   Model.prototype.createOptions = function() {
      this.maxIndex = 0;
   }   
   
   window.Game2048._Model = Model;

}());         