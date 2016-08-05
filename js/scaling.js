/* script whith defer */

/**
 * Добавляет масштабирование елементу
 * @param {object} options. Содержит свойства:
 * {html element} scaleMinusEl - кнопка для увелениея масштаба
 * {html element} scalePlusEl - уменьшения
 * {html element} scaleNEl - отображения текущего масштаба
 * {html element} object - маштабируемый объект
 * {number} step - шаг масштабирования
 * {number} showTime - время отображения текущего масштаба
 */
var Scalling;
(function() {
   "use strict"

   Scalling = function(options) {
      this.createOptions(options);
      this.initEvents();
   }
   
   Scalling.prototype.initEvents = function(options) {
      var self = this;
      
      self.scaleMinusEl.addEventListener('click', function() {
         self.scale -= self.step;
         self.updateScale();
      });
      
      self.scalePlusEl.addEventListener('click', function() {
         self.scale += self.step;
         self.updateScale();
      });
      
      //Масштабирование прокруткой колесика мыши (при нажатом ctrl)
      document.addEventListener('wheel', function(event) {
         if (event.ctrlKey) {
            event.preventDefault();
            self.scale += -event.deltaY / 100 * self.step;
            self.updateScale();
         }           
      });
      
      return self;
   }
   
   Scalling.prototype.updateScale = function() {
      this.corectScale();
      this.scaleNEl.innerHTML = this.scale + '%';
      this.object.style.transform = 'scale(' + this.scale / 100 + ')';
      this.showScale();
      
      return this;
   }
   
    Scalling.prototype.corectScale = function() {
      if (this.scale < 0) {
         this.scale = 0;
      } else if (this.scale > 101 - this.step && this.scale < 99 + this.step) {
         this.scale = 100;
      } 
      
      return this;
    }
   
   //Отображает текущее масштабирование
   Scalling.prototype.showScale = function() {
      var self = this;
      self.showScaleNEl();
      
      setTimeout(function() {
         self.hideScaleNEl();
      }, self.showTime);
      
      return self;
   }
   
   //Показывает текущее масштабирование
   Scalling.prototype.showScaleNEl = function() {
      var self = this;
      self.scaleNEl.style.display = 'block';
      setTimeout(function() {
         self.scaleNEl.style.opacity = 1;
      }, 50);
      
      return this;
   }
   
   //Скрывает текущее масштабирование
   Scalling.prototype.hideScaleNEl = function() {
      var self = this;
      this.scaleNEl.style.opacity = 0;
      setTimeout(function() {
         self.scaleNEl.style.display = 'none';
      }, 50);
      return this;
   }
  
   Scalling.prototype.createOptions = function(options) {
      this.scaleMinusEl = options.scaleMinusEl;
      this.scalePlusEl = options.scalePlusEl;
      this.scaleNEl = options.scaleNEl;
      this.object = options.object;
      this.step = options.step || 3;
      this.showTime = options.showTime || 3000;
      
      this.scale = 100;
      
      return this;
   }
}());

var scalingParent = document.getElementById('scale');
var scaling = new Scalling({
   scaleMinusEl: scalingParent.children[0],
   scalePlusEl: scalingParent.children[1],
   scaleNEl: scalingParent.children[2],
   object: document.getElementById('phone'),
   step: 3,
});