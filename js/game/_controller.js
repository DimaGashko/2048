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
      
      this._init();
   }
   
   Controller.prototype._init = function() {
      this.view.init(this.model.data.set.size);
      
      return this;
   }

   window.Game2048._Controller = Controller;

}()); 