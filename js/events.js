/* script whith defer */

/**
 * Создание события swipe
 *
 * В свойстве event.direction
 * Хранится направление:
 * left, top, right, bottom
 */
;(function() {
   var swipe = document.createEvent('Event');
   swipe.initEvent('swipe', true, true);

   var startX, startY, minDiferent = 65; 
   var diferentX, diferentY;
   
   
   if ('ontouchstart' in window) {
      document.addEventListener('touchstart', mouseDown);
      document.addEventListener('touchend', mouseUp);
   } else {      
      document.addEventListener('mousedown', mouseDown);
      document.addEventListener('mouseup', mouseUp);
   }
   
   function mouseDown(event) {
      var clientXY = getClientXY(event);
      
      startX = clientXY.clientX;
      startY = clientXY.clientY;
   }
   
   function mouseUp(event) {
      var clientXY = getClientXY(event);
      
      diferentX = clientXY.clientX - startX;
      diferentY = clientXY.clientY - startY;
      
      if (checkDiferent()) {
         swipe.direction = searchDirection();
         document.dispatchEvent(swipe);      
      }
   }   
   
   function getClientXY(event) {
      var clientX, clientY;
      
      if(event.clientX && event.clientY) {
         clientX = event.clientX;
         clientY = event.clientY;
      } else if(event.targetTouches && event.targetTouches[0]) {
         clientX = event.targetTouches[0].clientX;
         clientY = event.targetTouches[0].clientY;
      } else if(event.changedTouches && event.changedTouches[0]) {
         clientX = event.changedTouches[0].clientX;
         clientY = event.changedTouches[0].clientY;
      }
      
      return {
         clientX: clientX,
         clientY: clientY,
      }
   }
   
   function touchMoving() {
      document.addEventListener('touchend', function(event) {
         alert(event)
      });
   }
   
   
   function searchDirection() {
      if (Math.abs(diferentX) >= Math.abs(diferentY)) {
         return (diferentX > 0) ? 'right' : 'left';
      } else {
         return (diferentY < 0) ? 'top' : 'bottom';
      }
   }
   
   function checkDiferent() {
      return Math.abs(diferentX) >= minDiferent ||
         Math.abs(diferentY) >= minDiferent
   }
}());
