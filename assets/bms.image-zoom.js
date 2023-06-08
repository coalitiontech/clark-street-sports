/* Adapted from our work on their sister-site */
window.BOLD = window.BOLD || {};
BOLD.BMS = BOLD.BMS || {};

BOLD.helpers = BOLD.helpers || {};
BOLD.helpers.debounce = function debounce(debounced_function, wait, identifier){
  var identifier = 'dbounce' + identifier + Math.random();
  return function(){
    var context = this, args = arguments
    BOLD.debounceIDs = BOLD.debounceIDs || {};
    clearTimeout(BOLD.debounceIDs[identifier+(this.id || this.name)]);
    BOLD.debounceIDs[identifier+(this.id || this.name)] = setTimeout(function(){ debounced_function.apply(context, args); delete BOLD.debounceIDs[identifier+this.id]; }, wait)
  }
};

BOLD.BMS.ImageZoom = function(element, options){
  this.saveElement(element);
  this.applyOptions(options || {});
  this.createZoomingElement();
  this.createCloseButton();
}
BOLD.BMS.ImageZoom.defaults = {
  zoomingElementClass:'bold-zoom-zoom',
  closeButtonClass:'bold-zoom-zoom-close',
  closeButtonText:'X',
  zoomImgSrcAttribute:'data-zoom-src',
  zoomMobile:false,
  mobileWidthCutoff:800
}
BOLD.BMS.ImageZoom.initAll = function(selector){
  var initSelector = selector || '.' + null;
  var zoomElements = document.querySelectorAll(initSelector);
  for(var i=0; i<zoomElements.length; i++){
    new BOLD.BMS.ImageZoom(zoomElements[i]);
  }
}

BOLD.BMS.ImageZoom.prototype = {
  saveElement:function(element){
    this.element = element;
    element.addEventListener('click', this.toggleZoom.bind(this));
  },
  applyOptions:function(options){
    this.options = {};
    for(var key in BOLD.BMS.ImageZoom.defaults){
      this.options[key] = (typeof options[key] !== 'undefined' ? options[key] : BOLD.BMS.ImageZoom.defaults[key]);
    }
  },
  createZoomingElement:function(){
    var zoomingElement = this.zoomingElement = document.createElement('div');
    zoomingElement.className = this.options.zoomingElementClass;
    zoomingElement.style.display = 'none';
    zoomingElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.element.appendChild(zoomingElement);
  },
  toggleZoom:BOLD.helpers.debounce(function(){
    // Flip the zoom-enabled status to be the opposite of what it currently is.
    var enable = !(this.zoomingElement.style.display === '');

    // Force-disable if we're not supposed to zoom on mobile widths
    if(!this.options.zoomMobile && document.documentElement.clientWidth < this.options.mobileWidthCutoff){
      enable = false;
    }

    //Get the appropriate image. It may have been changed by JS since the last time we wanted a good zoom-in
    if(enable){
      var url = this.element.getAttribute(this.options.zoomImgSrcAttribute);
      this.zoomingElement.style.backgroundImage = 'url("' + url + '")';
    }

    // Toggle the display property between '' (empty/unset) and 'none'
    this.zoomingElement.style.display = this.closeButton.style.display = (enable ? '' : 'none');
  }, 50, 'toggleZoom'),
  createCloseButton:function(){
    var closeButton = this.closeButton = document.createElement('div');
    closeButton.className = this.options.closeButtonClass;
    closeButton.innerText = this.options.closeButtonText;
    closeButton.style.display = 'none';
    closeButton.addEventListener('click', this.toggleZoom.bind(this));
    this.element.appendChild(closeButton);
  },
  onMouseMove:function(evt){
    var imgBoundingBox = this.element.getBoundingClientRect();
    var horizOffset = ((evt.clientX - imgBoundingBox.left) / imgBoundingBox.width) * 100;
    var vertOffset = ((evt.clientY - imgBoundingBox.top) / imgBoundingBox.height) * 100;
    this.zoomingElement.style.transformOrigin = horizOffset + '% ' + vertOffset + '%';
  }
}

BOLD.BMS.ImageZoom.initAll('.zoom-image');
