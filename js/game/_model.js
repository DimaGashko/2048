;(function(){
   "use strict"
   
   /**
    * Игра "2048" - работа с данными
    * 
    * @constructor
    * @param {object} options - опции
    * @param {object} store - экземпляр Store
    */
   function Model(store) {
      this.store = store;
      this.data = this.store.data;
   }

   window.Game2048._Model = Model;

}());         