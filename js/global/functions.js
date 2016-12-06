;(function() {
   'use strict'
   
   /** 
    * Созает объект, который содержит свойства переданных обектов
    * 
    *
    * @param {object} объекты. Передаются в параметры.
    */
	var extend = function extend(/* objects */) {
      if (arguments.length < 2) return;
      
      var o1 = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
         var o2 = arguments[i];
 
         for (var key in o2) {
            if (typeof o2[key] === 'object') {        
               o1[key] = (typeof o1[key] === 'object') ?
                  o1[key] : (Array.isArray(o2[key]) ? [] : {});
               extend(o1[key], o2[key]);
            }

            o1[key] = o1[key] || o2[key];
         }
      
      }

      return arguments[0];
   }

	window.extend = extend;
}());

;(function(){
   'use strict'
   
   window.addClass = function(targ, className) {
      var classes = targ.className.split(' ');
      
      for (var i = 0; i < classes.length; i++) {
         if (classes[i].trim() === className) {
            return;
         }
      }
   
      targ.className = (targ.className + ' ' + className).trim(); 
   }
   
   window.removeClass = function(targ, className) {
      var classes = targ.className.split(' ');
      
      for (var i = 0; i < classes.length; i++) {
         if (classes[i].trim() === className) {
            classes.splice(i, 1);
         }
      }
      
      targ.className = classes.join(' ');
   }

   window.hasClass = function(targ, className) {
      var classes = targ.className.split(' ');
      
      for (var i = 0; i < classes.length; i++) {
         if (classes[i].trim() === className) {
            return true;
         }
      }
      return false;
   }
   
}());

;(function(){
   window.getRandomNumber = function(min, max) {
      return Math.round(Math.random() * (max - min)) + min; 
   }
}());