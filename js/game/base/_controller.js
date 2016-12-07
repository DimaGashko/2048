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
      this.view.init(this.model.getViewConfig());
      this.initEvents();
      
      return this;
   }
   
   Controller.prototype.initEvents = function() {
      this.view.addEvent('move', function(direction) {
         var store = this.model.store;
         var s = store.data.statuses;
         
         if (s.move || s.paused) return;
         s.move = true;
         
         this.model.move(direction);
         this.view.updateTiles(this.model.getTiles());
                  
         setTimeout(function() {
            if (s.change) this.moveAfter();
            s.move = false; 
         }.bind(this), store.options.tileSpeed + 10);           
         
      }.bind(this));
      
      return this;
   }
   
   Controller.prototype.moveAfter = function() {
      var model = this.model;
      
      model.joinIdentical();
      
      var newTile = model.addTile();
      if (newTile) model.onAdd.push(newTile);
      
      this.view.updateNewTiles(model.onDeleted, model.onAdd);
      
      this.model.data.score = this.view.score.n;
      //this.model.data.bestScore = this.view.bestScore.n;
   }

   window.Game2048._Controller = Controller;

}()); 