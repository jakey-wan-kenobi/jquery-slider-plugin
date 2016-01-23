A Simple jQuery Slider

How to Use: 

Attach the 'slider' jQuery event to any element: 

    $(document).ready(function() {
        console.log('running');
        $('#container').makeSlider({
            min: '0',
            max: '100',
            start: '50', 
            resolution: '1'
        });
    });
    


Optional parameters: 

    min: '0' // Specifies the starting point, defaults to 0
    max: '100' // Specifies maximum value, defaults to 100
    start: '50' // Specifies starting point of indicator, defaults to 50
    resolution: '1' // Specifies amount to increment/decrement when using add/subtract buttons