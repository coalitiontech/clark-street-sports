'use strict';
(function(){
  if(BOLD.common.eventEmitter && BOLD.common.eventEmitter.emit){
    BOLD.common.eventEmitter.emit('jQueryLoaded');
    BOLD.common.eventEmitter.jQueryLoaded = true;
  }
})();
