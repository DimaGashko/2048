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