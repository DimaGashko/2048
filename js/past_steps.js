;(function(){
   /**
    * PastSteps - хранение информации о предыдущих шагах
    *
    * @param {object} Game - Ссылка на Game2048
    *
    */
   var PastSteps = function(Game) {
      this.Game = Game;
      this.createOptions();
   }
   
   PastSteps.prototype.createOptions = function() {
      this.steps = this.Game.storage.pastSteps.get('') || [];
   }
   
   //options = {consoleTiles, score, restUndo}
   PastSteps.prototype.addStep = function(options) {
      if(options) {
         this.steps.push({
            consoleTiles: JSON.stringify(options.consoleTiles),
            score: options.score,
            restUndo: options.restUndo,
         });
      }   
      
      return this;
   }
   
   PastSteps.prototype.restart = function() {
      this.steps = [];
   }
   
   PastSteps.prototype.getPrevStep = function() {
      return this.steps[this.steps.length - 2];
   }
   
   PastSteps.prototype.getLastStep = function() {
      return this.steps[this.steps.length - 1];
   }
   
   PastSteps.prototype.getLastTiles = function() {
      var tiles = this.getLastStep().consoleTiles;
      return JSON.parse(tiles);
   }
   
   PastSteps.prototype.delLastStep = function() {
      this.steps.splice(-1, 1);
   }
   
   window.PastSteps = PastSteps;
}());