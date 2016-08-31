;(function(){
   /**
    * Speak - диалог с пользователем
    *
    * @param {object} Game - Ссылка на Game2048
    *
    */
   var Speak = function(Game) {
      this.Game = Game;
   }
   
   Object.defineProperty(Speak.prototype, 'prompt', {
      get: function() {
         if(!this._prompt) {
            this._prompt = new Prompt({});
         }
         
         return this._prompt;
      }
   });
   
   Object.defineProperty(Speak.prototype, 'combo', {
      get: function() {
         if(!this._combo) {
            this._combo = new Combo({delay: 3000});
         }
         
         return this._combo;
      }
   });
   
   Object.defineProperty(Speak.prototype, 'gameOver', {
      get: function() {
         if(!this._gameOver) {
            this._gameOver = new GameOver({
               restart: this.Game.restart.bind(this.Game),
            })
         }
         
         return this._gameOver;
      }
   });
   
   Object.defineProperty(Speak.prototype, 'youWin', {
      get: function() {
         if(!this._youWin) {
            this._youWin = new YouWin({
               restart: this.Game.restart.bind(this.Game),
               afterHide: function() {
                  this.gamePaused = false;
               }.bind(this.Game),
            })
         }
         
         return this._youWin;
      }
   });
   
   Object.defineProperty(Speak.prototype, 'menu', {
      get: function() {
         if(!this._menu) {
            this._menu = new Menu();
            
            this._menu.addItem('Continue');
            this._menu.addItem('Restart', function() {
               this.Game.restart();
            }.bind(this));
            this._menu.addItem('Settings', function() {
               this.settings.show();
            }.bind(this));
         }
         
         return this._menu;
      }
   });
   
   Object.defineProperty(Speak.prototype, 'settings', {
      get: function() {
         if(!this._settings) {
            var speak = this;
            var Game = this.Game;
            createItems();
         }
            
         function createItems() {     
            speak._settings = new Menu({
               containerClassName: 'game__setings',
            });
            
            speak._settings.addItem('Size: ' + Game.size, function() {
               speak.prompt.onHide = onHide.bind(null, 'size', 'Size: ');
               speak.prompt.show(Game.size);
            }, 'size');

            speak._settings.addItem('Undo: ' + Game.undoLen, function() {
               speak.prompt.onHide = onHide.bind(null, 'undoLen', 'Undo: ');
               speak.prompt.show(Game.undoLen);
            }, 'undoLen');
            
            speak._settings.addItem('Tiles count: ' + Game.nTilesStart, function() {
               speak.prompt.onHide = onHide.bind(null, 'nTilesStart', 'Tiles count: ');
               speak.prompt.show(Game.nTilesStart);
            }, 'nTilesStart');
            
            speak._settings.addItem('Default', function() {
               Game.setStartOptions();
               Game.corectOptions();
               updateProp('size', 'Size: ');
               updateProp('undoLen', 'Undo: ');
               updateProp('nTilesStart', 'Tiles Start: ');
            });
         }
         
         function onHide(prop, prefixText) {
            Game[prop] = +speak.prompt.getVal();
            Game.corectOptions();
            updateProp(prop, prefixText);
         }
         
         function updateProp(prop, prefixText) {
            Game.storage.settings.set(prop, Game[prop]);
            speak._settings.editItem(prop, prefixText + Game[prop]);
            Game.restart();
         }
         
         return this._settings;
      }
   });
   
   window.Speak = Speak;
}());