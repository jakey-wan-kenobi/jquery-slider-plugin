// A simple jQuery slider control plugin

// Requirements: 
// 1) Polished and easy to use
// 2) Cross-browser compatible (modern browsers)

// Plugin 
(function ( $ ) {

    // Our main function -- make this available as a jQuery object method 
    $.fn.makeSlider = function( options ) {
      
        // Declare variables we'll use 
        var bar,
            indicator, 
            position,
            settings,
            subtract, 
            add, 
            popover,
            value,
            that = this;
        
        // Default options -- these will be accessible at  'settings.min', for example
        var settings = $.extend({
            min: '0',
            max: '100',
            start: '50', 
            resolution: 1
        }, options );
      
        // Build slider and bind functions
        function _buildComponents() {
            // Create and append elements
            bar = document.createElement('div');
            bar.className = 'bar';
            indicator = document.createElement('div');
            indicator.className = 'indicator';
            subtract = document.createElement('div');
            add = document.createElement('div');
            subtract.className = 'subtract-button';
            add.className = 'add-button';
            subtract.innerHTML = '-';
            add.innerHTML = '+';
            bar.appendChild(subtract);
            bar.appendChild(add);
            popover = document.createElement('div');
            popover.className = 'popover';
            popover.style.visibility = 'hidden';
            bar.appendChild(popover);
            that.append(bar);
            value = settings.start;
            position = (value / settings.max) * bar.offsetWidth;
            indicator.style.transform = 'translate3d(' + position + 'px, 0px, 0px)';
            popover.style.transform = 'translate3d(' + position + 'px, 0px, 0px)';
            indicator.innerHTML = settings.start;
            popover.innerHTML = settings.start;
            bar.appendChild(indicator);
            
            // Add event listeners 
            bar.addEventListener('mousedown', _slideStart, false);
            subtract.addEventListener('mousedown', _decrementSlide, false);
            add.addEventListener('mousedown', _incrementSlide, false);
          
            // Set initival value
            
            // Append our slider 
            that.append(bar);

        }
      
        // Run this when user clicks/taps bar
        function _slideStart(ev) {
            if (ev.target == bar) {
                var x = ev.offsetX==undefined?ev.layerX:ev.offsetX;
                position = x;
                value = (x / bar.offsetWidth) * settings.max; 
                console.log(value);
                popover.innerHTML = parseInt(value);
                indicator.style.transform = 'translate3d(' + position + 'px, 0, 0)';
                popover.style.transform = 'translate3d(' + position + 'px, 0, 0)';
            }
          
            if (ev.target !== subtract && ev.target !== add) {
                popover.style.visibility = 'visible';
                indicator.innerHTML = '';
            }

            document.addEventListener('mousemove', _slideChange, false);
            document.addEventListener('mouseup', _slideStop, false);
        
        };
      
        // Run this when user drags (update the position of the indicator)
        function _slideChange(ev) {
            if(ev.target == bar){
                var x = ev.offsetX==undefined?ev.layerX:ev.offsetX;
                position = x;
                value = (x / bar.offsetWidth) * settings.max; 
                indicator.innerHTML = '';
                popover.innerHTML = parseInt(value);
                indicator.style.webkitTransform = 'translate3d(' + position + 'px, 0, 0)';
                popover.style.transform = 'translate3d(' + position + 'px, 0, 0)';
            }
        };
        
        function _decrementSlide(ev) {
            if (value > settings.min) {
                value = value - settings.resolution;
                indicator.innerHTML = value;
                popover.innerHTML = value;
                position = (value / settings.max) * bar.offsetWidth;
                indicator.style.webkitTransform = 'translate3d(' + position + 'px, 0, 0)';
                popover.style.webkitTransform = 'translate3d(' + position + 'px, 0, 0)';
            }
        };
        
        function _incrementSlide(ev) {
            if (value < settings.max) {
                value = parseInt(value) + parseInt(settings.resolution);            
                indicator.innerHTML = value;
                position = (value / settings.max) * bar.offsetWidth;
                indicator.style.webkitTransform = 'translate3d(' + position + 'px, 0, 0)';
            }
        };
      
        // Run this when user lets go
        function _slideStop(ev) {
            document.removeEventListener('mousemove', _slideChange, false);
            document.removeEventListener('mousemove', _slideStop, false);
            popover.style.visibility = 'hidden';
            indicator.innerHTML = parseInt(value);
        };
      
      
        // Initiate our slider 
        _buildComponents();
 
    };
 
  
  
  
  
}( jQuery ));





// Invoke our new method on the element with ID 'container' in our DOM 
$(document).ready(function() {
    $('#container').makeSlider({
        min: '0',
        max: '200',
        start: '100', 
        resolution: '1'
    });
});