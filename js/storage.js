;(function(){
   
   var GameStorage = function(Game) {
      this.Game = Game;
      this.settings = new Storage(this.prefix + 'settings-');
      this.pastSteps = new Storage(this.prefix + 'pastSteps');
   }
   
   GameStorage.prototype.clearPastSteps = function() {
      this.pastSteps.set('consoleTiles', null);
      this.pastSteps.set('restUndo', null);
      this.pastSteps.set('score', null);
   }
   
   GameStorage.prototype.prefix = '1game2048__';
   
   window.GameStorage = GameStorage;
}());