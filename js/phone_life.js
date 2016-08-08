/* script whith defer */

;(function() {
   function Phone(options) {
     this.create(options); 
   }
   
   Phone.prototype.create = function(options) {
      this.createOptions(options);
      this.getHTMLElements();
      this.createEvents();
      this.initEvents();
   }
   
   Phone.prototype.getHTMLElements = function() {
      this.el = {} //this.el.* - html elements
      
      var p = this.el.phone = document.getElementById('phone');
      this.el.main = p.getElementsByClassName('phone__main')[0];
   }
   
   Phone.prototype.createEvents = function() {
      this.createEventMain();
   }
   
   Phone.prototype.createEventMain = function main() {
      var self = this;
      main.count = 1;
   
      var clickmain = document.createEvent('Event');
      clickmain.initEvent('clickmain', true, true);
      
      this.el.main.addEventListener('click', function() {
         if (main.count >= self.options.mainClickN) {
            main.count = 1;
            document.dispatchEvent(clickmain);
         }
         
         main.count++;
      })
   }
   
   Phone.prototype.initEvents = function() {
      document.addEventListener('clickmain', function() {
         alert('Вы действительно не хотите закрыть игру "2048"?');
      });
   }
   
   Phone.prototype.createOptions = function(options) {
      this.options = {};
      this.options.mainClickN = options.mainClickN || 10;
      
      this.corectOptions();
   }
   
   Phone.prototype.corectOptions = function(options) {
      var o = this.options;
      o.mainClickN = (o.mainClickN > 0) ? o.mainClickN : 1;
   }
   
   new Phone({
      mainClickN: 15,
   });
}());