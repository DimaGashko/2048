;(function(){
   "use strict"
   
   /**
    * Игра "2048"
    * 
    * @constructor
    * @param {object} options - опции.
    */
   function Game(options) {
      this.options = options;
      this._init();
   }
   
   Game.prototype._init = function() {
      this.store = new Game._Store(this.options);
      this.metrics = new Game._Metrics();
      
      this.model = new Game._Model(this.store);
      this.view = new Game._View(this.metrics);
      this.controller = new Game._Controller(this.model, this.view);
      
      return this;
   }
   
   window.Game2048 = Game;

}());         