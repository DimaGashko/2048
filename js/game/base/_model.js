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
   
   Model.prototype.create = function() {
      if (this.data.steps.length < 2) {
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
   
   Model.prototype.move = function(direction) { 
      this.addStep();
      var size = this.data.set.size;
      
      if (direction === 'left') {
         this._moveTiles('x', 1);
         
      } else if (direction === 'top') {
         this._moveTiles('y', 1);
         
      } else if (direction === 'right') {
         this._moveTiles('x', size);
         
      } else if (direction === 'bottom') {
         this._moveTiles('y', size);
         
      } 
      
      return this;
   }
   
   Model.prototype._moveTiles = function(axis, startValue) {
      this.identicalTiles = [];
      
      var tiles = this.getTiles();
      var minusPos = (startValue === 1) ? -1 : 1;
      var size = this.data.set.size;
      var changeEdit = false;
      
      var ranks = [];
      
      for (var i = 0; i < size; i++) {
         ranks[i] = [];
      }
      
      var otherAxis = (axis === 'x') ? 'y' : 'x';
      for (var i = 0; i < tiles.length; i++) {
         ranks[tiles[i][otherAxis] - 1].push(tiles[i]);
      }
      
      for (var i = 0; i < ranks.length; i++) {
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
            
            //Изменилось ли что-то
            if (!changeEdit) {
               if (axisStart !== ranks[i][j][axis]) {
                  this.data.statuses.change = true;
                  changeEdit = true;
               } else {
                  this.data.statuses.change = false;
               }
            }
          
         }
      }
      
      return this;
   }
   
   Model.prototype.joinIdentical = function() {
      var identical = this.identicalTiles;
      this.onDeleted = []; this.onAdd = [];
      
      for (var i = 0; i < identical.length; i++) {
         var p = identical[i][1];
         var newTile = this.addTile(p.x, p.y, p.n * 2);
         newTile.merger = true;
         
         this.onAdd.push(newTile);
         this.onDeleted.push(identical[i][0].index, p.index);
         this.removeTiles(identical[i][0], p);
      }
      
      return this;
   }
   
   Model.prototype.removeTiles = function() {
      var tiles = this.getTiles();
      
      for (var i = 0; i < arguments.length; i++) {
         
         for (var j = 0; j < tiles.length; j++) {
            if (arguments[i].index === tiles[j].index) {
               tiles.splice(j, 1);
               break;
            }
         }
      }
      
      return this;
   }
   
   Model.prototype.addStep = function() {
      var d = this.data;
      
      var newStep = JSON.stringify(d.steps[d.steps.length - 1]);
      d.steps.push(JSON.parse(newStep));
      
      d.steps = d.steps.slice(-d.set.undoLen);
   }
   
   /**
    * Добавляет новую плитку в this.tiles
    */
   Model.prototype.addTile = function(x, y, n) {
      if (!x && !y) {
         var coordinates = this.getAvailableCoordinates();
      
         if (!coordinates.length) return false;
         var randomN = getRandomNumber(0, coordinates.length - 1);
         var select = coordinates[randomN].split('|');
         x = +select[0];
         y = +select[1];
      }
      
      var tile = {
         index: ++this.maxIndex,
         tileSpeed: this.store.options.tileSpeed,
         n: n || 2,
         x: x,
         y: y,
      }
      
      this.getTiles().push(tile);
      return tile;
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