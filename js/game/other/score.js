;(function() {
   'use strict'
   
   /** 
    * Конструктор Score
    *
    * @param {object} options - настройки. Содержит свойства:
    * {html element} element - элемент для score
    * {html element} scorePluse - элемент для анимирования
    */
   function Score(options) {
      this.createOptions(options);      
      this.add(options.start);
   }
   
   Score.prototype.add = function(val) {
      this.n += +val;
      this.element.innerText = this.n;
      
      if (this.n) {
         this.animateAdd(val);
      }
      
      return this
   } 
   
   Score.prototype.animateAdd = function aniScore(val) {
      if(aniScore.animate === false) return;
      
      var scorePlus = this.scorePlus;
      var classBase = 'game__score-plus game__score-plus-';
      
      aniScore.animate = false;
      
      scorePlus.innerText = '+' + val;
      scorePlus.className = classBase + 'start';
      
      setTimeout(function() {
         scorePlus.className = classBase + 'end';
      }, 500);
      
      setTimeout(function() {
         scorePlus.className = classBase + 'passive';
         aniScore.animate = true;
      }, 1200);
      
      return this;
   }
   
   Score.prototype.edit = function (val) {
      this.element.innerText = val;
      
      return this;
   }
   
   Score.prototype.getVal = function () {
      return this.element.innerText;
   }
   
   Score.prototype.createOptions = function(options) {
      this.element = options.element;
      this.scorePlus = options.scorePlus;
      this.n = 0;
      
      return this;
   }
   
   
   window.Game2048.Score = Score;
   
}());