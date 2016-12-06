;(function(){
   "use strict"
   
   console.time('create');
   var game2048 = new Game2048({
      nTilesStart: 2,
      size: 4,
      undoLen: 5,
      tileSpeed: 150,
      saveInterval: 1000,
   }) 
   console.timeEnd('create');

}());         