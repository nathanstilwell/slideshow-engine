# Slideshow Engine

Most carousels and slideshow use the same basic mechanics. Some "activate" by having the *slides* be revealed and hidden with some effect such as fading or flipping. Some will "slide" by having the "slides" move inside of a container where the overflow is hidden.

SlideshowEngine is an attempt to bundle that basic behavior and leave the presentation to the implementor. It will support *activation* by applying a class to the active item and it will *slide* both vertically and horizontally by applying the minimum css style required.

For the moment, this requires jQuery.

## How To

To create a new SlideshowEngine, give it an element

		var
			element = $('#sliding-carousel'),
			engine = new SlideshowEngine(element);
		
		$('#previous-button').on('click', function () {
			engine.reverse();
		});
		
		$('#next-button').on('click', function () {
			engine.advance();
		});
		
### Options

The SlideshowEngine takes an object literal as a configuration object with the following options. Default options are shown.

		// for 'sliding' carousels 
		var options = {
    	    transition: 'slide',		// slideshow transition type
	        start : 0,					// starting slide
	        visible: 1,					// how many slides are visible
	        preferCSSTransform: true,	// use CSS if possible
	        vertical: false,			// to slide vertically, set to true
		  // if using jQuery animate,
	        easing: null,				// preferred easing
     	    speed: 150					// preferred speed of transition
		};
		
		// for 'activating' carousels
		var options = {
			activeClass = 'active'     	// css class to add to active element
		};
		
## API

### advance

The advance method with advance the carousel engine. In an activating carousel this will be the next child of the slideshow parent. In vertical sliding carousels, this will be the next child or visible set of children below. In horizontal sliding carousels, this will be the child or visible set of children to the right.

SlideshowEngine.advance takes no parameters

		var engine = new SlideshowEngine(element);
		engine.advance();

### reverse

The reverse method with reverse the carousel engine. In an activating carousel this will be the previous child of the slideshow parent. In vertical sliding carousels, this will be the previous child or visible set of children above. In horizontal sliding carousels, this will be the child or visible set of children to the left.

SlideshowEngine.advance takes no parameters

		var engine = new SlideshowEngine(element);
		engine.reverse();


### moveTo

The moveTo method takes an index as a parameter and with transition to the child. The moveTo method will only take valid parameters, that is an appropriate index for a child that exists and is not hidden.

		var engine = new SlideshowEngine(element);
		engine.moveTo(4);

### getCurrentItem

The getCurrentItem method returns and jQuery wrapped DOM object that is the currently *active* item. If multiple items are visible, this will be the first one.

		var engine = new SlideshowEngine(element);
		var currentItem = engine.getCurrentItem();

### getPosition
 
The getPosition method returns an integer representing the index of the active item in the carousel. The index for SlideshowEngine is 0 indexed.

		var engine = new SlideshowEngine(element);
		var currentItem = engine.getPosition(); // 0


### setPosition

Depending on your presentation, it might be necessary at times to manually update the position of the slideshow engine (I've needed this feature in certain responsive implementations). Setting the current position of the engine will only set the internal position variable and will NOT advance or reverse the carousel. So it is possible to break the carousel this way. Please use with caution.

		var engine = new SlideshowEngine(element);
		engine.setPosition(3);

### getConfig

The getConfig method returns the merged configuration options being used by the engine (the defaults plus the passed in options)


## Final Thoughts

This is still a very young project that has not cut it's teeth yet. Please be file bugs and be patient.