import React from 'react';

export default class AnimatedKal extends React.Component {

 componentDidMount() {
      function startPres(document, window) {
        if (window.presStarted)
          return;
        window.presStarted = true;

        var innerBg = document.querySelector('.innerBg');

      /**
       * impress.js
       *
       * impress.js is a presentation tool based on the power of CSS3 transforms and transitions
       * in modern browsers and inspired by the idea behind prezi.com.
       *
       *
       * Copyright 2011-2012 Bartek Szopka (@bartaz)
       *
       * Released under the MIT and GPL Licenses.
       *
       * ------------------------------------------------
       *  author:  Bartek Szopka
       *  version: 0.5.3
       *  url:     http://bartaz.github.com/impress.js/
       *  source:  http://github.com/bartaz/impress.js/
       */

      /*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, latedef:true, newcap:true,
               noarg:true, noempty:true, undef:true, strict:true, browser:true */

      // You are one of those who like to know how things work inside?
      // Let me show you the cogs that make impress.js run...
      (function ( document, window ) {
          'use strict';
          
          // HELPER FUNCTIONS
          
          // `pfx` is a function that takes a standard CSS property name as a parameter
          // and returns it's prefixed version valid for current browser it runs in.
          // The code is heavily inspired by Modernizr http://www.modernizr.com/
          var pfx = (function () {
              
              var style = document.createElement('dummy').style,
                  prefixes = 'Webkit Moz O ms Khtml'.split(' '),
                  memory = {};
              
              return function ( prop ) {
                  if ( typeof memory[ prop ] === "undefined" ) {
                      
                      var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),
                          props   = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');
                      
                      memory[ prop ] = null;
                      for ( var i in props ) {
                          if ( style[ props[i] ] !== undefined ) {
                              memory[ prop ] = props[i];
                              break;
                          }
                      }
                  
                  }
                  
                  return memory[ prop ];
              };
          
          })();
          
          // `arraify` takes an array-like object and turns it into real Array
          // to make all the Array.prototype goodness available.
          var arrayify = function ( a ) {
              return [].slice.call( a );
          };
          
          // `css` function applies the styles given in `props` object to the element
          // given as `el`. It runs all property names through `pfx` function to make
          // sure proper prefixed version of the property is used.
          var css = function ( el, props ) {
              var key, pkey;
              for ( key in props ) {
                  if ( props.hasOwnProperty(key) ) {
                      pkey = pfx(key);
                      if ( pkey !== null ) {
                          el.style[pkey] = props[key];
                      }
                  }
              }
              return el;
          };
          
          // `toNumber` takes a value given as `numeric` parameter and tries to turn
          // it into a number. If it is not possible it returns 0 (or other value
          // given as `fallback`).
          var toNumber = function (numeric, fallback) {
              return isNaN(numeric) ? (fallback || 0) : Number(numeric);
          };
          
          // `byId` returns element with given `id` - you probably have guessed that ;)
          var byId = function ( id ) {
              return document.getElementById(id);
          };
          
          // `$` returns first element for given CSS `selector` in the `context` of
          // the given element or whole document.
          var $ = function ( selector, context ) {
              context = context || document;
              return context.querySelector(selector);
          };
          
          // `$$` return an array of elements for given CSS `selector` in the `context` of
          // the given element or whole document.
          var $$ = function ( selector, context ) {
              context = context || document;
              return arrayify( context.querySelectorAll(selector) );
          };
          
          // `triggerEvent` builds a custom DOM event with given `eventName` and `detail` data
          // and triggers it on element given as `el`.
          var triggerEvent = function (el, eventName, detail) {
              var event = document.createEvent("CustomEvent");
              event.initCustomEvent(eventName, true, true, detail);
              el.dispatchEvent(event);
          };
          
          // `translate` builds a translate transform string for given data.
          var translate = function ( t ) {
              return " translate3d(" + t.x + "px," + t.y + "px," + t.z + "px) ";
          };
          
          // `rotate` builds a rotate transform string for given data.
          // By default the rotations are in X Y Z order that can be reverted by passing `true`
          // as second parameter.
          var rotate = function ( r, revert ) {
              var rX = " rotateX(" + r.x + "deg) ",
                  rY = " rotateY(" + r.y + "deg) ",
                  rZ = " rotateZ(" + r.z + "deg) ";
              
              return revert ? rZ+rY+rX : rX+rY+rZ;
          };
          
          // `scale` builds a scale transform string for given data.
          var scale = function ( s ) {
              return " scale(" + s + ") ";
          };
          
          // `perspective` builds a perspective transform string for given data.
          var perspective = function ( p ) {
              return " perspective(" + p + "px) ";
          };
          
          // `getElementFromHash` returns an element located by id from hash part of
          // window location.
          var getElementFromHash = function () {
              // get id from url # by removing `#` or `#/` from the beginning,
              // so both "fallback" `#slide-id` and "enhanced" `#/slide-id` will work
              return byId( window.location.hash.replace(/^#\/?/,"") );
          };
          
          // `computeWindowScale` counts the scale factor between window size and size
          // defined for the presentation in the config.
          var computeWindowScale = function ( config ) {
              var hScale = window.innerHeight / config.height,
                  wScale = window.innerWidth / config.width,
                  scale = hScale > wScale ? wScale : hScale;
              
              if (config.maxScale && scale > config.maxScale) {
                  scale = config.maxScale;
              }
              
              if (config.minScale && scale < config.minScale) {
                  scale = config.minScale;
              }
              
              return scale;
          };
          
          // CHECK SUPPORT
          var body = document.body;
          
          var ua = navigator.userAgent.toLowerCase();
          var impressSupported = 
                                // browser should support CSS 3D transtorms 
                                 ( pfx("perspective") !== null ) &&
                                 
                                // and `classList` and `dataset` APIs
                                 ( body.classList ) &&
                                 ( body.dataset );
                                 
                                // but some mobile devices need to be blacklisted,
                                // because their CSS 3D support or hardware is not
                                // good enough to run impress.js properly, sorry...
                                // ( ua.search(/(iphone)|(ipod)|(android)/) === -1 );
          
          if (!impressSupported) {
              // we can't be sure that `classList` is supported
              body.className += " impress-not-supported ";
          } else {
              body.classList.remove("impress-not-supported");
              body.classList.add("impress-supported");
          }
          
          // GLOBALS AND DEFAULTS
          
          // This is were the root elements of all impress.js instances will be kept.
          // Yes, this means you can have more than one instance on a page, but I'm not
          // sure if it makes any sense in practice ;)
          var roots = {};
          
          // some default config values.
          var defaults = {
              width: 1024,
              height: 768,
              maxScale: 1,
              minScale: 0,
              
              perspective: 1000,
              
              transitionDuration: 1000
          };
          
          // it's just an empty function ... and a useless comment.
          var empty = function () { return false; };
          
          // IMPRESS.JS API
          
          // And that's where interesting things will start to happen.
          // It's the core `impress` function that returns the impress.js API
          // for a presentation based on the element with given id ('impress'
          // by default).
          var impress = window.impress = function ( rootId ) {
              var previousInit = body.classList.contains("impress-enabled");
              
              // If impress.js is not supported by the browser return a dummy API
              // it may not be a perfect solution but we return early and avoid
              // running code that may use features not implemented in the browser.
              if (!impressSupported) {
                  return {
                      init: empty,
                      goto: empty,
                      prev: empty,
                      next: empty
                  };
              }
              
              rootId = rootId || "impress";
              
              // if given root is already initialized just return the API
              if (roots["impress-root-" + rootId]) {
                  return roots["impress-root-" + rootId];
              }
              
              // data of all presentation steps
              var stepsData = {};
              
              // element of currently active step
              var activeStep = null;
              
              // current state (position, rotation and scale) of the presentation
              var currentState = null;
              
              // array of step elements
              var steps = null;
              
              // configuration options
              var config = null;
              
              // scale factor of the browser window
              var windowScale = null;        
              
              // root presentation elements
              var root = byId( rootId );
              if (previousInit) {
                  var canvas = root.children[0];
              } else {
                  var canvas = document.createElement("div");
              }
              
              var initialized = false;
              
              // STEP EVENTS
              //
              // There are currently two step events triggered by impress.js
              // `impress:stepenter` is triggered when the step is shown on the 
              // screen (the transition from the previous one is finished) and
              // `impress:stepleave` is triggered when the step is left (the
              // transition to next step just starts).
              
              // reference to last entered step
              var lastEntered = null;
              
              // `onStepEnter` is called whenever the step element is entered
              // but the event is triggered only if the step is different than
              // last entered step.
              var onStepEnter = function (step) {
                  if (lastEntered !== step) {
                      triggerEvent(step, "impress:stepenter");
                      lastEntered = step;
                  }
              };
              
              // `onStepLeave` is called whenever the step element is left
              // but the event is triggered only if the step is the same as
              // last entered step.
              var onStepLeave = function (step) {
                  if (lastEntered === step) {
                      triggerEvent(step, "impress:stepleave");
                      lastEntered = null;
                  }
              };
              
              // `initStep` initializes given step element by reading data from its
              // data attributes and setting correct styles.
              var initStep = function ( el, idx ) {
                  var data = el.dataset,
                      step = {
                          translate: {
                              x: toNumber(data.x),
                              y: toNumber(data.y),
                              z: toNumber(data.z)
                          },
                          rotate: {
                              x: toNumber(data.rotateX),
                              y: toNumber(data.rotateY),
                              z: toNumber(data.rotateZ || data.rotate)
                          },
                          scale: toNumber(data.scale, 1),
                          el: el
                      };
                  
                  if ( !el.id ) {
                      el.id = "step-" + (idx + 1);
                  }
                  
                  stepsData["impress-" + el.id] = step;
                  
                  css(el, {
                      position: "absolute",
                      transform: "translate(-50%,-50%)" +
                                 translate(step.translate) +
                                 rotate(step.rotate) +
                                 scale(step.scale),
                      transformStyle: "preserve-3d"
                  });
              };
              
              // `init` API function that initializes (and runs) the presentation.
              var init = function () {
                  if (initialized) { return; }
                  
                  // First we set up the viewport for mobile devices.
                  // For some reason iPad goes nuts when it is not done properly.
                  var meta = $("meta[name='viewport']") || document.createElement("meta");
                  meta.content = "width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no";
                  if (meta.parentNode !== document.head) {
                      meta.name = 'viewport';
                      document.head.appendChild(meta);
                  }
                  
                  // initialize configuration object
                  var rootData = root.dataset;
                  config = {
                      width: toNumber( rootData.width, defaults.width ),
                      height: toNumber( rootData.height, defaults.height ),
                      maxScale: toNumber( rootData.maxScale, defaults.maxScale ),
                      minScale: toNumber( rootData.minScale, defaults.minScale ),                
                      perspective: toNumber( rootData.perspective, defaults.perspective ),
                      transitionDuration: toNumber( rootData.transitionDuration, defaults.transitionDuration )
                  };
                  
                  windowScale = computeWindowScale( config );
                  
                  // wrap steps with "canvas" element
                  if (!previousInit) {
                      arrayify( root.childNodes ).forEach(function ( el ) {
                          canvas.appendChild( el );
                      });
                      root.appendChild(canvas);
                  }
                  
                  // set initial styles
                  document.documentElement.style.height = "100%";
                  
                  css(body, {
                      height: "100%",
                      overflow: "hidden"
                  });
                  
                  var rootStyles = {
                      position: "absolute",
                      transformOrigin: "top left",
                      transition: "all 0s ease-in-out",
                      transformStyle: "preserve-3d"
                  };
                  
                  css(root, rootStyles);
                  css(root, {
                      top: "50%",
                      left: "50%",
                      transform: perspective( config.perspective/windowScale ) + scale( windowScale )
                  });
                  css(canvas, rootStyles);
                  
                  body.classList.remove("impress-disabled");
                  body.classList.add("impress-enabled");
                  
                  // get and init steps
                  steps = $$(".step", root);
                  steps.forEach( initStep );
                  
                  // set a default initial state of the canvas
                  currentState = {
                      translate: { x: 0, y: 0, z: 0 },
                      rotate:    { x: 0, y: 0, z: 0 },
                      scale:     1
                  };
                  
                  initialized = true;
                  
                  triggerEvent(root, "impress:init", { api: roots[ "impress-root-" + rootId ] });
              };
              
              // `getStep` is a helper function that returns a step element defined by parameter.
              // If a number is given, step with index given by the number is returned, if a string
              // is given step element with such id is returned, if DOM element is given it is returned
              // if it is a correct step element.
              var getStep = function ( step ) {
                  if (typeof step === "number") {
                      step = step < 0 ? steps[ steps.length + step] : steps[ step ];
                  } else if (typeof step === "string") {
                      step = byId(step);
                  }
                  return (step && step.id && stepsData["impress-" + step.id]) ? step : null;
              };
              
              // used to reset timeout for `impress:stepenter` event
              var stepEnterTimeout = null;
              
              // `goto` API function that moves to step given with `el` parameter (by index, id or element),
              // with a transition `duration` optionally given as second parameter.
              var goto = function ( el, duration ) {
                  
                  if ( !initialized || !(el = getStep(el)) ) {
                      // presentation not initialized or given element is not a step
                      return false;
                  }
                  
                  // Sometimes it's possible to trigger focus on first link with some keyboard action.
                  // Browser in such a case tries to scroll the page to make this element visible
                  // (even that body overflow is set to hidden) and it breaks our careful positioning.
                  //
                  // So, as a lousy (and lazy) workaround we will make the page scroll back to the top
                  // whenever slide is selected
                  //
                  // If you are reading this and know any better way to handle it, I'll be glad to hear about it!
                  window.scrollTo(0, 0);
                  
                  var step = stepsData["impress-" + el.id];

                  function updateSurface(step, operation) {
                      var state = step.dataset.state;
                      if (typeof state == 'string') {
                          state = state.trim().split(' ');
                          for (var i = 0; i < state.length; ++i) {
                              innerBg.classList[operation](state[i]);
                          }
                      }
                  }
                  
                  if ( activeStep ) {
                      activeStep.classList.remove("active");
                      updateSurface(activeStep, 'remove');
                  }
                  el.classList.add("active");
                  updateSurface(el, 'add');
                  
                  // compute target state of the canvas based on given step
                  var target = {
                      rotate: {
                          x: -step.rotate.x,
                          y: -step.rotate.y,
                          z: -step.rotate.z
                      },
                      translate: {
                          x: -step.translate.x,
                          y: -step.translate.y,
                          z: -step.translate.z
                      },
                      scale: 1 / step.scale
                  };
                  
                  // Check if the transition is zooming in or not.
                  //
                  // This information is used to alter the transition style:
                  // when we are zooming in - we start with move and rotate transition
                  // and the scaling is delayed, but when we are zooming out we start
                  // with scaling down and move and rotation are delayed.
                  var zoomin = target.scale >= currentState.scale;
                  
                  duration = toNumber(duration, config.transitionDuration);
                  var delay = (duration / 2);
                  
                  // if the same step is re-selected, force computing window scaling,
                  // because it is likely to be caused by window resize
                  if (el === activeStep) {
                      windowScale = computeWindowScale(config);
                  }
                  
                  var targetScale = target.scale * windowScale;
                  
                  // trigger leave of currently active element (if it's not the same step again)
                  if (activeStep && activeStep !== el) {
                      onStepLeave(activeStep);
                  }
                  
                  // Now we alter transforms of `root` and `canvas` to trigger transitions.
                  //
                  // And here is why there are two elements: `root` and `canvas` - they are
                  // being animated separately:
                  // `root` is used for scaling and `canvas` for translate and rotations.
                  // Transitions on them are triggered with different delays (to make
                  // visually nice and 'natural' looking transitions), so we need to know
                  // that both of them are finished.
                  css(root, {
                      // to keep the perspective look similar for different scales
                      // we need to 'scale' the perspective, too
                      transform: perspective( config.perspective / targetScale ) + scale( targetScale ),
                      transitionDuration: duration + "ms",
                      transitionDelay: (zoomin ? delay : 0) + "ms"
                  });
                  
                  css(canvas, {
                      transform: rotate(target.rotate, true) + translate(target.translate),
                      transitionDuration: duration + "ms",
                      transitionDelay: (zoomin ? 0 : delay) + "ms"
                  });
                  
                  // Here is a tricky part...
                  //
                  // If there is no change in scale or no change in rotation and translation, it means there was actually
                  // no delay - because there was no transition on `root` or `canvas` elements.
                  // We want to trigger `impress:stepenter` event in the correct moment, so here we compare the current
                  // and target values to check if delay should be taken into account.
                  //
                  // I know that this `if` statement looks scary, but it's pretty simple when you know what is going on
                  // - it's simply comparing all the values.
                  if ( currentState.scale === target.scale ||
                      (currentState.rotate.x === target.rotate.x && currentState.rotate.y === target.rotate.y &&
                       currentState.rotate.z === target.rotate.z && currentState.translate.x === target.translate.x &&
                       currentState.translate.y === target.translate.y && currentState.translate.z === target.translate.z) ) {
                      delay = 0;
                  }
                  
                  // store current state
                  currentState = target;
                  activeStep = el;
                  
                  // And here is where we trigger `impress:stepenter` event.
                  // We simply set up a timeout to fire it taking transition duration (and possible delay) into account.
                  //
                  // I really wanted to make it in more elegant way. The `transitionend` event seemed to be the best way
                  // to do it, but the fact that I'm using transitions on two separate elements and that the `transitionend`
                  // event is only triggered when there was a transition (change in the values) caused some bugs and 
                  // made the code really complicated, cause I had to handle all the conditions separately. And it still
                  // needed a `setTimeout` fallback for the situations when there is no transition at all.
                  // So I decided that I'd rather make the code simpler than use shiny new `transitionend`.
                  //
                  // If you want learn something interesting and see how it was done with `transitionend` go back to
                  // version 0.5.2 of impress.js: http://github.com/bartaz/impress.js/blob/0.5.2/js/impress.js
                  window.clearTimeout(stepEnterTimeout);
                  stepEnterTimeout = window.setTimeout(function() {
                      onStepEnter(activeStep);
                  }, duration + delay);
                  
                  return el;
              };
              
              // `prev` API function goes to previous step (in document order)
              var prev = function () {
                  var prev = steps.indexOf( activeStep ) - 1;
                  prev = prev >= 0 ? steps[ prev ] : steps[ steps.length-1 ];
                  
                  return goto(prev);
              };
              
              // `next` API function goes to next step (in document order)
              var next = function () {
                  var next = steps.indexOf( activeStep ) + 1;
                  next = next < steps.length ? steps[ next ] : steps[ 0 ];
                  
                  return goto(next);
              };
              
              // Adding some useful classes to step elements.
              //
              // All the steps that have not been shown yet are given `future` class.
              // When the step is entered the `future` class is removed and the `present`
              // class is given. When the step is left `present` class is replaced with
              // `past` class.
              //
              // So every step element is always in one of three possible states:
              // `future`, `present` and `past`.
              //
              // There classes can be used in CSS to style different types of steps.
              // For example the `present` class can be used to trigger some custom
              // animations when step is shown.
              root.addEventListener("impress:init", function(){
                  // STEP CLASSES
                  steps.forEach(function (step) {
                      step.classList.add("future");
                  });
                  
                  root.addEventListener("impress:stepenter", function (event) {
                      event.target.classList.remove("past");
                      event.target.classList.remove("future");
                      event.target.classList.add("present");
                  }, false);
                  
                  root.addEventListener("impress:stepleave", function (event) {
                      event.target.classList.remove("present");
                      event.target.classList.add("past");
                  }, false);
                  
              }, false);
              
              // Adding hash change support.
              root.addEventListener("impress:init", function(){
                  
                  // last hash detected
                  var lastHash = "";
                  
                  // `#/step-id` is used instead of `#step-id` to prevent default browser
                  // scrolling to element in hash.
                  //
                  // And it has to be set after animation finishes, because in Chrome it
                  // makes transtion laggy.
                  // BUG: http://code.google.com/p/chromium/issues/detail?id=62820
                  root.addEventListener("impress:stepenter", function (event) {
                      window.location.hash = lastHash = "#/" + event.target.id;
                  }, false);
                  
                  window.addEventListener("hashchange", function () {
                      // When the step is entered hash in the location is updated
                      // (just few lines above from here), so the hash change is 
                      // triggered and we would call `goto` again on the same element.
                      //
                      // To avoid this we store last entered hash and compare.
                      if (window.location.hash !== lastHash) {
                          goto( getElementFromHash() );
                      }
                  }, false);
                  
                  // START 
                  // by selecting step defined in url or first step of the presentation
                  goto(getElementFromHash() || steps[0], 0);
              }, false);
              
              body.classList.add("impress-disabled");
              
              // store and return API for given impress.js root element
              return (roots[ "impress-root-" + rootId ] = {
                  init: init,
                  goto: goto,
                  next: next,
                  prev: prev
              });

          };
          
          // flag that can be used in JS to check if browser have passed the support test
          impress.supported = impressSupported;
          
      })(document, window);

      // NAVIGATION EVENTS

      // As you can see this part is separate from the impress.js core code.
      // It's because these navigation actions only need what impress.js provides with
      // its simple API.
      //
      // In future I think about moving it to make them optional, move to separate files
      // and treat more like a 'plugins'.
      (function ( document, window ) {
          'use strict';
          
          // throttling function calls, by Remy Sharp
          // http://remysharp.com/2010/07/21/throttling-function-calls/
          var throttle = function (fn, delay) {
              var timer = null;
              return function () {
                  var context = this, args = arguments;
                  clearTimeout(timer);
                  timer = setTimeout(function () {
                      fn.apply(context, args);
                  }, delay);
              };
          };
          
          // wait for impress.js to be initialized
          document.addEventListener("impress:init", function (event) {
              // Getting API from event data.
              // So you don't event need to know what is the id of the root element
              // or anything. `impress:init` event data gives you everything you 
              // need to control the presentation that was just initialized.
              var api = event.detail.api;
              
              // KEYBOARD NAVIGATION HANDLERS
              
              // Prevent default keydown action when one of supported key is pressed.
              document.addEventListener("keydown", function ( event ) {
                  if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
                      event.preventDefault();
                  }
              }, false);
              
              // Trigger impress action (next or prev) on keyup.
              
              // Supported keys are:
              // [space] - quite common in presentation software to move forward
              // [up] [right] / [down] [left] - again common and natural addition,
              // [pgdown] / [pgup] - often triggered by remote controllers,
              // [tab] - this one is quite controversial, but the reason it ended up on
              //   this list is quite an interesting story... Remember that strange part
              //   in the impress.js code where window is scrolled to 0,0 on every presentation
              //   step, because sometimes browser scrolls viewport because of the focused element?
              //   Well, the [tab] key by default navigates around focusable elements, so clicking
              //   it very often caused scrolling to focused element and breaking impress.js
              //   positioning. I didn't want to just prevent this default action, so I used [tab]
              //   as another way to moving to next step... And yes, I know that for the sake of
              //   consistency I should add [shift+tab] as opposite action...
              document.addEventListener("keyup", function ( event ) {
                  if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
                      switch( event.keyCode ) {
                          case 33: // pg up
                          case 37: // left
                          case 38: // up
                                   api.prev();
                                   break;
                          case 9:  // tab
                          case 32: // space
                          case 34: // pg down
                          case 39: // right
                          case 40: // down
                                   api.next();
                                   break;
                      }
                      
                      event.preventDefault();
                  }
              }, false);
              
              // delegated handler for clicking on the links to presentation steps
              document.addEventListener("click", function ( event ) {
                  // event delegation with "bubbling"
                  // check if event target (or any of its parents is a link)
                  var target = event.target;
                  while ( (target.tagName !== "A") &&
                          (target !== document.documentElement) ) {
                      target = target.parentNode;
                  }
                  
                  if ( target.tagName === "A" ) {
                      var href = target.getAttribute("href");
                      
                      // if it's a link to presentation step, target this step
                      if ( href && href[0] === '#' ) {
                          target = document.getElementById( href.slice(1) );
                      }
                  }
                  
                  if ( api.goto(target) ) {
                      event.stopImmediatePropagation();
                      event.preventDefault();
                  }
              }, false);
              
              // delegated handler for clicking on step elements
              document.addEventListener("click", function ( event ) {
                  // var target = event.target;
                  // // find closest step element that is not active
                  // while ( !(target.classList.contains("step") && !target.classList.contains("active")) &&
                  //         (target !== document.documentElement) ) {
                  //     target = target.parentNode;
                  // }
                  
                  // if ( api.goto(target) ) {
                  //     event.preventDefault();
                  // }
              }, false);
              
              // touch handler to detect taps on the left and right side of the screen
              // based on awesome work of @hakimel: https://github.com/hakimel/reveal.js
              document.addEventListener("touchstart", function ( event ) {
                  if (event.touches.length === 1) {
                      var x = event.touches[0].clientX,
                          width = window.innerWidth * 0.3,
                          result = null;
                          
                      if ( x < width ) {
                          result = api.prev();
                      } else if ( x > window.innerWidth - width ) {
                          result = api.next();
                      }
                      
                      if (result) {
                          event.preventDefault();
                      }
                  }
              }, false);
              
              // rescale presentation when window is resized
              window.addEventListener("resize", throttle(function () {
                  // force going to active step again, to trigger rescaling
                  api.goto( document.querySelector(".step.active"), 500 );
              }, 250), false);
              
          }, false);
              
      })(document, window);

      // THAT'S ALL FOLKS!
      //
      // Thanks for reading it all.
      // Or thanks for scrolling down and reading the last part.
      //
      // I've learnt a lot when building impress.js and I hope this code and comments
      // will help somebody learn at least some part of it.


      document.addEventListener("keydown", function(e) {
          if (e.keyCode == 27) {
              impress().goto('overview');
          }
      }, false);

      }
      /* end of impress.js */

      var ready = (function(){
          var readyList,
              DOMContentLoaded,
              class2type = {};
              class2type["[object Boolean]"] = "boolean";
              class2type["[object Number]"] = "number";
              class2type["[object String]"] = "string";
              class2type["[object Function]"] = "function";
              class2type["[object Array]"] = "array";
              class2type["[object Date]"] = "date";
              class2type["[object RegExp]"] = "regexp";
              class2type["[object Object]"] = "object";

          var ReadyObj = {
              // Is the DOM ready to be used? Set to true once it occurs.
              isReady: false,
              // A counter to track how many items to wait for before
              // the ready event fires. See #6781
              readyWait: 1,
              // Hold (or release) the ready event
              holdReady: function( hold ) {
                  if ( hold ) {
                      ReadyObj.readyWait++;
                  } else {
                      ReadyObj.ready( true );
                  }
              },
              // Handle when the DOM is ready
              ready: function( wait ) {
                  // Either a released hold or an DOMready/load event and not yet ready
                  if ( (wait === true && !--ReadyObj.readyWait) || (wait !== true && !ReadyObj.isReady) ) {
                      // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                      if ( !document.body ) {
                          return setTimeout( ReadyObj.ready, 1 );
                      }

                      // Remember that the DOM is ready
                      ReadyObj.isReady = true;
                      // If a normal DOM Ready event fired, decrement, and wait if need be
                      if ( wait !== true && --ReadyObj.readyWait > 0 ) {
                          return;
                      }
                      // If there are functions bound, to execute
                      readyList.resolveWith( document, [ ReadyObj ] );

                      // Trigger any bound ready events
                      //if ( ReadyObj.fn.trigger ) {
                      //  ReadyObj( document ).trigger( "ready" ).unbind( "ready" );
                      //}
                  }
              },
              bindReady: function() {
                  if ( readyList ) {
                      return;
                  }
                  readyList = ReadyObj._Deferred();

                  // Catch cases where $(document).ready() is called after the
                  // browser event has already occurred.
                  if ( document.readyState === "complete" ) {
                      // Handle it asynchronously to allow scripts the opportunity to delay ready
                      return setTimeout( ReadyObj.ready, 1 );
                  }

                  // Mozilla, Opera and webkit nightlies currently support this event
                  if ( document.addEventListener ) {
                      // Use the handy event callback
                      document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
                      // A fallback to window.onload, that will always work
                      window.addEventListener( "load", ReadyObj.ready, false );

                  // If IE event model is used
                  } else if ( document.attachEvent ) {
                      // ensure firing before onload,
                      // maybe late but safe also for iframes
                      document.attachEvent( "onreadystatechange", DOMContentLoaded );

                      // A fallback to window.onload, that will always work
                      window.attachEvent( "onload", ReadyObj.ready );

                      // If IE and not a frame
                      // continually check to see if the document is ready
                      var toplevel = false;

                      try {
                          toplevel = window.frameElement == null;
                      } catch(e) {}

                      if ( document.documentElement.doScroll && toplevel ) {
                          doScrollCheck();
                      }
                  }
              },
              _Deferred: function() {
                  var // callbacks list
                      callbacks = [],
                      // stored [ context , args ]
                      fired,
                      // to avoid firing when already doing so
                      firing,
                      // flag to know if the deferred has been cancelled
                      cancelled,
                      // the deferred itself
                      deferred  = {

                          // done( f1, f2, ...)
                          done: function() {
                              if ( !cancelled ) {
                                  var args = arguments,
                                      i,
                                      length,
                                      elem,
                                      type,
                                      _fired;
                                  if ( fired ) {
                                      _fired = fired;
                                      fired = 0;
                                  }
                                  for ( i = 0, length = args.length; i < length; i++ ) {
                                      elem = args[ i ];
                                      type = ReadyObj.type( elem );
                                      if ( type === "array" ) {
                                          deferred.done.apply( deferred, elem );
                                      } else if ( type === "function" ) {
                                          callbacks.push( elem );
                                      }
                                  }
                                  if ( _fired ) {
                                      deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
                                  }
                              }
                              return this;
                          },

                          // resolve with given context and args
                          resolveWith: function( context, args ) {
                              if ( !cancelled && !fired && !firing ) {
                                  // make sure args are available (#8421)
                                  args = args || [];
                                  firing = 1;
                                  try {
                                      while( callbacks[ 0 ] ) {
                                          callbacks.shift().apply( context, args );//shifts a callback, and applies it to document
                                      }
                                  }
                                  finally {
                                      fired = [ context, args ];
                                      firing = 0;
                                  }
                              }
                              return this;
                          },

                          // resolve with this as context and given arguments
                          resolve: function() {
                              deferred.resolveWith( this, arguments );
                              return this;
                          },

                          // Has this deferred been resolved?
                          isResolved: function() {
                              return !!( firing || fired );
                          },

                          // Cancel
                          cancel: function() {
                              cancelled = 1;
                              callbacks = [];
                              return this;
                          }
                      };

                  return deferred;
              },
              type: function( obj ) {
                  return obj == null ?
                      String( obj ) :
                      class2type[ Object.prototype.toString.call(obj) ] || "object";
              }
          }
          // The DOM ready check for Internet Explorer
          function doScrollCheck() {
              if ( ReadyObj.isReady ) {
                  return;
              }

              try {
                  // If IE is used, use the trick by Diego Perini
                  // http://javascript.nwbox.com/IEContentLoaded/
                  document.documentElement.doScroll("left");
              } catch(e) {
                  setTimeout( doScrollCheck, 1 );
                  return;
              }

              // and execute any waiting functions
              ReadyObj.ready();
          }
          // Cleanup functions for the document ready method
          if ( document.addEventListener ) {
              DOMContentLoaded = function() {
                  document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
                  ReadyObj.ready();
              };

          } else if ( document.attachEvent ) {
              DOMContentLoaded = function() {
                  // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                  if ( document.readyState === "complete" ) {
                      document.detachEvent( "onreadystatechange", DOMContentLoaded );
                      ReadyObj.ready();
                  }
              };
          }
          function ready( fn ) {
              // Attach the listeners
              ReadyObj.bindReady();

              var type = ReadyObj.type( fn );

              // Add the callback
              readyList.done( fn );//readyList is result of _Deferred()
          }
          return ready;
      })();
      var loadPresentation = function() {
        var presentation = localStorage.getItem('preview-string');
        var config = JSON.parse(localStorage.getItem('preview-config'));

        if (presentation) {
          document.body.innerHTML = presentation;
        //  document.body.className = config.surface + " " + document.body.className;
        }
      };
      ready(function() {
        var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
        if (match){
        var matchVersion = parseInt(match[1]);
        // console.log(matchVersion);
      }


        if (document.getElementById('launched-placeholder'))
            loadPresentation();

        if (!window.presStarted && !match || (matchVersion > 11)) {
            startPres(document, window);
            impress().init();   
        }


        if ("ontouchstart" in document.documentElement) { 
          // console.log('touch');
            document.querySelector(".hint").innerHTML = 
                "<p>Tap on the left or right to navigate</p>";
        }
        // console.log('no-touch');
      });

    }

  render() {
     return(
          <div>
            <div className="fallback-message">
              <p>Your browser <b>doesn't support the features required</b> by impress.js, so you are presented with a simplified version of this presentation.</p>
              <p>For the best experience please use the latest <b>Chrome</b>, <b>Safari</b> or <b>Firefox</b> browser.</p>
            </div>
            <div className="bg bg-surf-grad-light strut-surface">
              <div className="bg innerBg strut-slide-31 bg-surf-grad-light">
                <div id="impress">
                    <div className="step past" data-state="strut-slide-0 bg-surf-grad-light " data-x="11414.186666666666" data-y="5022.72" data-scale="3" id="step-1">
                      <div className="slideContainer strut-slide-0">
                        <div className="componentContainer element-1">
                          <div className="transformContainer">
                            <img src="assets/THeCAyM.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step past" data-state="strut-slide-1 bg-surf-grad-light " data-x="11386.88" data-y="4976.64" data-scale="9" id="step-2">
                      <div className=" slideContainer strut-slide-1">
                          <div className="componentContainer element-2">
                            <div className="transformContainer">
                              <img src="assets/W4VC7KA.jpg" />
                            </div>
                          </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-2 bg-surf-grad-light " data-x="9038.506666666666" data-y="3686.4" data-scale="3" id="step-3">
                      <div className=" slideContainer strut-slide-2">
                        <div className="componentContainer element-3">
                          <div className="transformContainer">
                            <img src="assets/aeJiyVW.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-3 bg-surf-grad-light " data-x="9038.506666666666" data-y="5222.4" data-scale="3" id="step-4">
                      <div className=" slideContainer strut-slide-3">
                        <div className="componentContainer element-4">
                          <div className="transformContainer">
                            <img src="assets/oL1A1w8.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-4 bg-surf-grad-light " data-x="9038.506666666666" data-y="5222.4" data-scale="3" id="step-5">
                      <div className=" slideContainer strut-slide-4">
                        <div className="componentContainer element-5">
                          <div className="transformContainer">
                            <img src="assets/Qj4tpWh.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-5 bg-surf-grad-light " data-x="9038.506666666666" data-y="5222.4" data-scale="3" id="step-6">
                      <div className=" slideContainer strut-slide-5">
                        <div className="componentContainer element-6">
                          <div className="transformContainer">
                            <img src="assets/9pJEqx5.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-6 bg-surf-grad-light " data-x="9038.506666666666" data-y="5222.4" data-scale="3" id="step-7">
                      <div className=" slideContainer strut-slide-6">
                        <div className="componentContainer element-7">
                          <div className="transformContainer">
                            <img src="assets/DYGln2a.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-7 bg-surf-grad-light " data-x="13994.666666666666" data-y="3655.68" data-scale="3" id="step-8">
                      <div className=" slideContainer strut-slide-7">
                        <div className="componentContainer element-8">
                          <div className="transformContainer">
                            <img src="assets/789iioI.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-8 bg-surf-grad-light " data-x="13994.666666666666" data-y="3655.68" data-scale="3" id="step-9">
                      <div className=" slideContainer strut-slide-8">
                        <div className="componentContainer element-9">
                          <div className="transformContainer">
                            <img src="assets/YCGc6Vm.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="step future" data-state="strut-slide-9 bg-surf-grad-light " data-x="14008.32" data-y="3671.04" data-scale="6" id="step-10">
                      <div className=" slideContainer strut-slide-9">
                        <div className="componentContainer element-10">
                          <div className="transformContainer">
                            <img src="assets/8L9axSV.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-10 bg-surf-grad-light " data-x="16752.64" data-y="3717.12" data-scale="6" id="step-11">
                      <div className=" slideContainer strut-slide-10">
                        <div className="componentContainer element-11">
                          <div className="transformContainer">
                            <img src="assets/nV659P6.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-11 bg-surf-grad-light " data-x="16752.64" data-y="3717.12" data-scale="6" id="step-12">
                      <div className=" slideContainer strut-slide-11">
                        <div className="componentContainer element-12">
                          <div className="transformContainer">
                            <img src="assets/KH1TiH0.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-12 bg-surf-grad-light " data-x="16752.64" data-y="3717.12" data-scale="6" id="step-13">
                      <div className=" slideContainer strut-slide-12">
                        <div className="componentContainer element-13">
                          <div className="transformContainer">
                            <img src="assets/zakeAjj.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-13 bg-surf-grad-light " data-x="15551.146666666667" data-y="5898.24" data-scale="6" id="step-14">
                      <div className=" slideContainer strut-slide-13">
                        <div className="componentContainer element-14">
                          <div className="transformContainer">
                            <img src="assets/DihBOb3.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-14 bg-surf-grad-light " data-x="15564.8" data-y="7403.52" data-scale="6" id="step-15">
                      <div className=" slideContainer strut-slide-14">
                        <div className="componentContainer element-15">
                          <div className="transformContainer">
                            <img src="assets/EM5q56V.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-15 bg-surf-grad-light " data-x="15564.8" data-y="7403.52" data-scale="6" id="step-16">
                      <div className=" slideContainer strut-slide-15">
                        <div className="componentContainer element-16">
                          <div className="transformContainer">
                            <img src="assets/8mYtM8S.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-16 bg-surf-grad-light " data-x="14581.76" data-y="10014.72" data-scale="6" id="step-17">
                      <div className=" slideContainer strut-slide-16">
                        <div className="componentContainer element-17">
                          <div className="transformContainer">
                            <img src="assets/ikQyOXB.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-17 bg-surf-grad-light " data-x="14581.76" data-y="10014.72" data-scale="6" id="step-18">
                      <div className=" slideContainer strut-slide-17">
                        <div className="componentContainer element-18">
                          <div className="transformContainer">
                            <img src="assets/3ITYgiM.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-18 bg-surf-grad-light " data-x="17681.066666666666" data-y="10030.08" data-scale="9" id="step-19">
                      <div className=" slideContainer strut-slide-18">
                        <div className="componentContainer element-19">
                          <div className="transformContainer">
                            <img src="assets/mnxbO8p.jpg" />
                          </div>
                        </div>
                        <div className="componentContainer element-19-b">
                          <div className="transformContainer">
                            <img src="assets/21vw7st.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-19 bg-surf-grad-light " data-x="17681.066666666666" data-y="10030.08" data-scale="9" id="step-20">
                      <div className=" slideContainer strut-slide-19">
                        <div className="componentContainer element-20">
                          <div className="transformContainer">
                            <img src="assets/8Afxsji.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="step future" data-state="strut-slide-20 bg-surf-grad-light " data-x="17681.066666666666" data-y="12241.92" data-scale="9" id="step-21">
                      <div className=" slideContainer strut-slide-20">
                        <div className="componentContainer element-21">
                          <div className="transformContainer">
                            <img src="assets/ienaNSt.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="step future" data-state="strut-slide-21 bg-surf-grad-light " data-x="14445.226666666667" data-y="13409.28" data-scale="6" id="step-22">
                      <div className=" slideContainer strut-slide-21">
                        <div className="componentContainer element-22">
                          <div className="transformContainer">
                            <img src="assets/zMbsd1s.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-22 bg-surf-grad-light " data-x="14445.226666666667" data-y="13409.28" data-scale="6" id="step-23">
                      <div className=" slideContainer strut-slide-22">
                        <div className="componentContainer element-23">
                          <div className="transformContainer">
                            <img src="assets/25nQkCX.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="step future" data-state="strut-slide-23 bg-surf-grad-light " data-x="10676.906666666666" data-y="7941.12" data-rotate-z="89.95437383553926" data-scale="9" id="step-24">
                      <div className=" slideContainer strut-slide-23">
                        <div className="componentContainer element-24">
                          <div className="transformContainer">
                            <img src="assets/g2YSTXw.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-24 bg-surf-grad-light " data-x="11414.186666666666" data-y="8448" data-scale="6" id="step-25">
                      <div className=" slideContainer strut-slide-24">
                        <div className="componentContainer element-25">
                          <div className="transformContainer">
                            <img src="assets/WzBzrKe.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="step future" data-state="strut-slide-25 bg-surf-grad-light " data-x="12397.226666666667" data-y="9692.16" data-scale="3" id="step-26">
                      <div className=" slideContainer strut-slide-25">
                        <div className="componentContainer element-26">
                          <div className="transformContainer">
                            <img src="assets/tTSRpHm.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-26 bg-surf-grad-light " data-x="12397.226666666667" data-y="9692.16" data-scale="3" id="step-27">
                      <div className=" slideContainer strut-slide-26">
                        <div className="componentContainer element-27">
                          <div className="transformContainer">
                            <img src="assets/2FV3Ssg.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-27 bg-surf-grad-light " data-x="12397.226666666667" data-y="9692.16" data-scale="3" id="step-28">
                      <div className=" slideContainer strut-slide-27">
                        <div className="componentContainer element-28">
                          <div className="transformContainer">
                            <img src="assets/XbmPvZl.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-28 bg-surf-grad-light " data-x="9461.76" data-y="10951.68" data-scale="9" id="step-29">
                      <div className=" slideContainer strut-slide-28">
                        <div className="componentContainer element-29">
                          <div className="transformContainer">
                            <img src="assets/X5gK1Kn.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-29 bg-surf-grad-light " data-x="12096.853333333333" data-y="10536.96" data-rotate-z="360.96341093241864" data-scale="3" id="step-30">
                      <div className=" slideContainer strut-slide-29">
                        <div className="componentContainer element-30">
                          <div className="transformContainer">
                            <img src="assets/Da2YLgI.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step future" data-state="strut-slide-30 bg-surf-grad-light " data-x="12096.853333333333" data-y="10536.96" data-rotate-z="360.96341093241864" data-scale="3" id="step-31">
                      <div className=" slideContainer strut-slide-30">
                        <div className="componentContainer element-31">
                          <div className="transformContainer">
                            <img src="assets/vcBIUre.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="step future" data-state="strut-slide-31 bg-surf-grad-light " data-x="12424.533333333333" data-y="10475.52" data-rotate-x="60.73352628386726" data-rotate-z="421.6969372162859" data-scale="3" id="step-32">
                      <div className=" slideContainer strut-slide-31">
                        <div className="componentContainer element-32">
                          <div className="transformContainer">
                            <img src="assets/RNpfaVb.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="hint">
                <p>Use a spacebar or arrow keys to navigate</p>
                </div>
              </div>
            </div>
          </div>
        );
        }
      }
