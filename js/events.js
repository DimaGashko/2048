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

   var startX, startY, minDiferent = 100; 
   var diferentX, diferentY;
   
   document.addEventListener('mousedown', function(event) {
      startX = event.clientX;
      startY = event.clientY;
   }); 
  
   document.addEventListener('mouseup', function(event) {
      diferentX = event.clientX - startX;
      diferentY = event.clientY - startY;
      
      if (checkDiferent()) {
         swipe.direction = searchDirection();
         document.dispatchEvent(swipe);      
      }
   });
   
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
