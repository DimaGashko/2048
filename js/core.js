var _2048 = new Game2048({
   nBlocksStart: 2,
   size: 4, 
})

for(var i = 0; i < _2048.allTiles.length; i++) {
   console.log(_2048.allTiles[i]);
}

document.addEventListener('swipe', function(event) {
   console.log('swipe:', event.direction);
});

