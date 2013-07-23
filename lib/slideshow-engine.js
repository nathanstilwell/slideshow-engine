/* jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: false, newcap: true, immed: true, indent: 2 */
/*global createModule: false, console: false */

createModule('src.slideshow-engine.slideshow_engine', [
  'vendor.jquery'
],
function ($) {
  var proto;

  var noop = function noop () {};

  function SlideshowEngine (element, options) {
    //
    //    Properties
    //
    var
      VERSION = '0.0.1',
      elem = $(element),
      defaults = {
        activeClass: 'active',
        easing: null,
        transition: 'slide',
        speed: 150,
        start : 0,
        visible: 1
      },
      residents = elem.children(),
      wrapper = elem.parent(),
      opts = $.extend({}, defaults, options),
      currentPosition = Math.abs(opts.start) || 0,
      transform = null,
      self = this,
      _moveTo;

    //
    //  Private
    //

    function slideToTranslateX (position) {
      var style = {};

      style[transform] = 'translateX(' + -getResidentsWidth(position) + 'px)';
      elem.css(style);
    }

    function slideToJsAnimate (position) {
      var style = {};

      style.left = '-' + getResidentsWidth(position) + 'px';
      elem.animate(style, opts.speed, opts.easing);
    }

    function activateSlide (position) {
      currentPosition = position;
      residents.removeClass(opts.activeClass);
      residents.filter(':nth-child(' + (position + 1) + ')').addClass(opts.activeClass);
    }

    function calculateElementWidth (el) {
      var
        marginLeft = parseInt(el.css('marginLeft'), 10) || 0,
        marginRight = parseInt(el.css('marginRight'), 10) || 0;

      return el.outerWidth() + marginLeft + marginRight;
    }

    function getResidentsWidth(upTo) {
      var width = 0;
      residents.each(function (i, el) {
        if ((!upTo && upTo !== 0) || upTo >= i + 1) {
          width += calculateElementWidth($(el));
        }
      });
      return width;
    }

    function slideTransformInit (transform) {
      var translateProp = 'translateX(' + -getResidentsWidth(Math.abs(opts.start)) +'px)';
      elem.css(transform, translateProp);
      _moveTo = slideToTranslateX;
    }

    function slideJsAnimateInit () {
      elem.css('left', -getResidentsWidth(Math.abs(opts.start)) + 'px');
      _moveTo = slideToJsAnimate;
    }

    function slideInit () {
      var i = document.createElement('i');
      transform = (typeof i.style.transform !== 'undefined') && 'transform' ||
                  (typeof i.style.webkitTransform !== 'undefined') && 'webkitTransform' ||
                  (typeof i.style.MozTransform !== 'undefined') && 'MozTranform' ||
                  (typeof i.style.OTransform !== 'undefined') && 'OTransform' ||
                  (typeof i.style.msTransform !== 'undefined') && 'msTransform';

      wrapper.css('overflow-x', 'hidden');

      elem.css({
        'position' : 'relative',
        'width' : getResidentsWidth()
      });

      if (opts.visible) {
        wrapper.css('width', getResidentsWidth(opts.visible));
      }

      if (transform !== null) {
        slideTransformInit(transform);
      } else {
        slideJsAnimateInit();
      }
    }

    function activeInit () {
      residents.first().addClass('active');
      _moveTo = activateSlide;
    }

    //
    //  Initialization
    //

    if (opts.transition === 'slide') {
      slideInit();
    }

    if (opts.transition === 'active') {
      activeInit();
    }

    //
    //  Public
    //

    this.version = VERSION;
    this.length = residents.size();

    this.moveTo = function moveTo (position) {
      if (position >= 0 && position < self.length) {
        currentPosition = position;
        _moveTo(position);
      }
      return self;
    };

    this.getCurrentItem = function getCurrentItem () {
      return residents.eq(currentPosition);
    };

    this.getPosition = function getPosition () {
      return currentPosition;
    };

    this.setPosition = function setPosition (position) {
      this.currentPosition = position;
    };

    this.getConfig = function getConfig () {
      return opts;
    };
  } // SlideshowEngine Constructor

  //
  //  Prototype Utilities
  //

  proto = SlideshowEngine.prototype;

  proto.size = function size () {
    return this.length;
  };

  proto.getPosition = function getPosition () {
    return this.getPosition();
  };

  proto._setPosition = function setPosition (position) {
    this.setPosition(position);
  };

  proto.advance = function advance (steps) {
    var pos = this.getPosition(),
        config = this.getConfig(),
        st = steps ? steps : config.visible || 1,
        nextPosition = pos + st;
    if (st >= this.length) {
      nextPosition = this.length - 1;
    }
    this.moveTo(nextPosition < 0 ? 0 : nextPosition);
  };

  proto.reverse = function reverse(steps) {
    var pos = this.getPosition(),
        config = this.getConfig(),
        st = steps ? steps : config.visible || 1,
        previousPosition = pos - st;
    if (previousPosition >= this.length) {
      previousPosition = this.length - 1;
    }
    this.moveTo(previousPosition < 0 ? 0 : previousPosition);
    return this;
  };

  return SlideshowEngine;
});


