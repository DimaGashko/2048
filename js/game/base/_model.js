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