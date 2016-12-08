;(function() {
   'use strict'
   
   /** 
    * Конструктор BestScore
    *
    * @param {object} options - настройки. Содержит свойства:
    * {html element} element - элемент для score
    */  

   function BestScore(options) {
      this.element = options.element;
      this.n = 0;
      
      this.add(options.start);
   }
   
   BestScore.prototype.add = function(val) {
      if (val > this.n) {
         this.editVal(val);
      }
      
      return this;
   }
   
   BestScore.prototype.editVal = function(val) {
      this.n = +val;
      this.element.innerText = this.n;
      
      return this;
   }
   
   window.Game2048.BestScore = BestScore;
   
}());