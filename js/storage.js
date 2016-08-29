;(function(){
   
   var GameStorage = function(Game) {
      this.Game = Game;
      this.settings = new Storage(this.prefix + 'settings-');
      this.pastSteps = new Storage(this.prefix + 'pastSteps-');
   }
   
   GameStorage.prototype.prefix = '1game2048__';
   
   window.GameStorage = GameStorage;
}());