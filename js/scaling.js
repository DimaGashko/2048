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
   Scaling = function(options) {
      this.createOptions(options);
      this.initEvents();
   }
   
   Scaling.prototype.initEvents = function(options) {
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
   
   Scaling.prototype.updateScale = function() {
      this.scale = (this.scale < 0) ? this.scale = 0 : this.scale;
      this.scaleNEl.innerHTML = this.scale + '%';
      this.object.style.transform = 'scale(' + this.scale / 100 + ')';
      this.showScale();
      
      return this;
   }
   
   //Отображает текущее масштабирование
   Scaling.prototype.showScale = function() {
      var self = this;
      self.showScaleNEl();
      
      setTimeout(function() {
         self.hideScaleNEl();
      }, self.showTime);
      
      return self;
   }
   
   //Показывает текущее масштабирование
   Scaling.prototype.showScaleNEl = function() {
      this.scaleNEl.style.opacity = 1;
      
      return this;
   }
   
   //Скрывает текущее масштабирование
   Scaling.prototype.hideScaleNEl = function() {
      this.scaleNEl.style.opacity = 0;
      
      return this;
   }
  
   Scaling.prototype.createOptions = function(options) {
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
var scaling = new Scaling({
   scaleMinusEl: scalingParent.children[0],
   scalePlusEl: scalingParent.children[1],
   scaleNEl: scalingParent.children[2],
   object: document.getElementById('phone'),
   step: 3,
});