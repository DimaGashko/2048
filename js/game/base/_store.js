;(function() {
   'use strict'
   
   /**
    * Создает объект, для управления localStorage приложения
    *
    * @constructor
    */
   var Store = function(options) {   
      this._createOptions(options);
      this._init();
      this._initAutoSave();
   }
   
   Store.prototype._init = function() {    
      if(!localStorage[this.options.name]) {
         this.data = extend({}, this.DEFAULT_DATA);
         this.save();
      } else {
         this.parse();
      }
      
      return this;
   }

   Store.prototype.save = function() {
      try {
         localStorage[this.options.name] = JSON.stringify(this.data);
      } catch (error) {
         if (error.name === 'QuotaExceededError') {
            // - - - //
         }
      }
            
      return this;
   }
   
   Store.prototype.parse = function() {
      try {
         var d = JSON.parse(localStorage[this.options.name]);
         
         var checkData = true; 
         if (!checkData) {
            throw new SyntaxError('Отсутствуют необходимые свойства');
         }
         
         this.data = d;
      } catch (error) {
         if (error.type === 'SyntaxError') {
            this.data = extend({}, this.DEFAULT_DATA);
            this.save();
         }
      }
      
      return this;
   }
   
   Store.prototype._initAutoSave = function() { 
      var store = this; 
      var o = this.options;
    
      this.autoSaveTimer = setTimeout(function autoSave() {
         store.save();
         store.autoSaveTimer = setTimeout(autoSave, o.saveInterval);
      }, o.saveInterval);
      
      return this;
   }
   
   Store.prototype._stopAutoSave = function() {
      clearInterval(this.autoSaveTimer);
      return this;
   }
   
   Store.prototype._createOptions = function(options) {
      this.options = extend({}, options, this.DEFAULT_OPTIONS);
      this.DEFAULT_DATA = this.getDefaultData();
      
      return this;
   }
   
   Store.prototype.getDefaultData = function() {
      var o = this.options;
      
      return {
         steps: [[]],
         set: {
            nTilesStart: o.nTilesStart,
            size: o.size,
            undoLen: o.undoLen,
         },
      }
      
   }
   
   Store.prototype.DEFAULT_OPTIONS = {
      nTilesStart: 2,
      size: 4,
      undoLen: 5,
      name: 'game2048',
   }
   
   window.Game2048._Store = Store;
   
}());