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
         var store = this.model.store;
         var s = store.data.statuses;
         if (s.move && s.paused) return;
         
         s.move = true;
         
         this.model.move(direction);
         this.view.updateTiles(this.model.getTiles());
                  
         setTimeout(function() {
            this.moveAfter();
            
            s.move = false; 
         }.bind(this), store.options.tileSpeed);           
         
      }.bind(this));
      
      return this;
   }
   
   Controller.prototype.moveAfter = function() {
      var model = this.model;
      
      model.joinIdentical();
      
      var newTile = model.addTile();
      if (newTile) model.onAdd.push(newTile);
      
      this.view.updateNewTiles(model.onDeleted, model.onAdd);
   }
   
   Controller.prototype.viewInit = function() {
      var size = this.model.data.set.size;
      var tiles = this.model.getTiles()
      
      this.view.init(size, tiles);
      
      return this;
   }

   window.Game2048._Controller = Controller;

}()); 