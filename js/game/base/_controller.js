;(function(){
   "use strict"
   
   /**
    * Игра "2048" - управление игрой
    * 
    * @constructor
    */
   function Controller(model, view) {
      this.model = model;
      this.view = view;
      
      this.init();
   }
   
   Controller.prototype.init = function() {
      this.viewInit();
      this.initEvents()
      
      return this;
   }
   
   Controller.prototype.initEvents = function() {
      this.view.addEvent('move', function(direction) {
         var s = this.model.data.statuses;
            
         if (!s.move && !s.paused) {
            s.move = true;
            
            var tiles = this.model.getTiles();
            this.model.move(direction);
            this.view.updateTiles(tiles);
            
            s.move = false;
         }
            
         
      }.bind(this));
      
      return this;
   }
   
   Controller.prototype.viewInit = function() {
      var size = this.model.data.set.size;
      var tiles = this.model.getTiles()
      
      this.view.init(size, tiles);
      
      return this;
   }

   window.Game2048._Controller = Controller;

}()); 