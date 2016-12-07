;(function() {
   'use strict'
   
   /** 
    * Конструктор BestScore
    *
    * @param {object} options - настройки. Содержит свойства:
    * {html element} element - элемент для score
    */  

   function BestScore(options) {
      this.createOptions(options);
      this.create();
   }
   
   BestScore.prototype.createOptions = function(options) {
      this.element = options.element;
      
      return this;
   }
   
   BestScore.prototype.create = function() {      
      this.editVal(this.Storage.get(''));
      
      return this;
   }
   
   BestScore.prototype.add = function(val) {
      if (val > this.getVal()) {
         this.editVal(val);
         this.save();
      }
   }
   
   BestScore.prototype.editVal = function(val) {
      this.element.innerText = val;
      
      return this;
   }
   
   BestScore.prototype.getVal = function() {
      return +this.element.innerText;
   }
   
   BestScore.prototype.save = function() {
      if (+this.Storage.get('') < this.getVal()) {
         this.Storage.set('', this.getVal());
      }
     
      return this;
   }
   
   BestScore.prototype.Storage = new Storage('game2048__bestscore');
   
   
   
   window.Game2048.Score = Score;
   
}());