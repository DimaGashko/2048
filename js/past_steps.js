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
      this.steps = [];
   }
   
   //options = {consoleTiles, score, restUndo}
   PastSteps.prototype.addStep = function(options) {
      if(options) {
         this.steps.push({
            consoleTiles: JSON.stringify(options.consoleTiles),
            score: options.score,
            restUndo: options.lastUndo,
         });
      }   
      
      return this;
   }
   
   PastSteps.prototype.getPrevStep = function(prop) {
      return this.steps[this.steps.length - 2];
   }
   
   PastSteps.prototype.getLastStep = function(prop) {
      return this.steps[this.steps.length - 1];
   }
   
   PastSteps.prototype.delLastStep = function(prop) {
      this.steps.splice(-1, 1);
   }
   
   window.PastSteps = PastSteps;
}());