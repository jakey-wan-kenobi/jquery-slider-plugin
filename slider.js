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
        
        // Returns true if using mobile
        window.mobilecheck = function() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
            console.log(check);
        }
        
        
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
            
            
            // Add mobile listeners
            bar.addEventListener('mousedown', _slideStart, false);
            subtract.addEventListener('mousedown', _decrementSlide, false);
            add.addEventListener('mousedown', _incrementSlide, false);
            
            bar.addEventListener('touchstart', _slideStart, false);
            
            
          
            // Set initival value
            
            // Append our slider 
            that.append(bar);

        }
      
        // Run this when user clicks/taps bar
        function _slideStart(ev) {
            console.log('mousedown');
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
            
            document.addEventListener('touchmove', _slideChange, false);
            
            //document.addEventListener('touchmove', _slideChange, false);
        
        };
      
        // Run this when user drags (update the position of the indicator)
        function _slideChange(ev) {
            console.log('moousemove')
            console.log(ev.touches[0].clientX);
            if(ev.target == bar){
                var x = ev.offsetX==undefined?ev.layerX:ev.offsetX;
                console.log(position);
                position = x;
                value = (x / bar.offsetWidth) * settings.max; 
                indicator.innerHTML = '';
                popover.innerHTML = parseInt(value);
                indicator.style.webkitTransform = 'translate3d(' + position + 'px, 0, 0)';
                popover.style.transform = 'translate3d(' + position + 'px, 0, 0)';
            }
            
            if (mobilecheck() == true ) {
                var x = ev.touches[0].clientX - bar.offsetWidth / 2;
                console.log(position);
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