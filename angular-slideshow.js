var Slideshow = angular.module('Slideshow', ['monospaced.mousewheel']);

Slideshow.controller('slideshowController', function(){
  var _this = this;
  this.clusters;
  this.currentPage = 0;

  // Build images clusters
  this.init = function () {
    _this.clusters = [
      {title: 'Step 1', image: 'http://lorempixel.com/400/200/', text: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.'},
      {title: 'Step 2', image: 'http://lorempixel.com/400/200/', text: 'Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus.'},
      {title: 'Step 3', image: 'http://lorempixel.com/400/200/', text: 'Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus..'}
    ];
  };

  /**
   * Right arrow functionality
   * @param.fast boolean. Used when bullet icon is pressed
   */

  this.nextSlide = function() {
    _this.currentPage++;
    if ( _this.currentPage == ( _this.clusters.length ) ) {
      _this.currentPage = 0;
    }

    var firstElement = document.querySelector('.first-cluster');
    var width = firstElement.offsetWidth * _this.currentPage;
    firstElement.style.marginLeft = '-' + width + 'px';
  };

  /**
   * Left arrow functionality
   * @param.fast boolean. Used when bullet icon is pressed
   */
  this.prevSlide = function() {
    if ( _this.currentPage == 0 ) {
      _this.currentPage = _this.clusters.length;
    }

    _this.currentPage--;

    var firstElement = document.querySelector('.first-cluster');
    var width = firstElement.offsetWidth * _this.currentPage;
    firstElement.style.marginLeft = '-' + width + 'px';
  };

  /**
   * Returns the number of pages/clusters
   */
  this.getNumPages = function() {
    return new Array(_this.pageNum);
  };

  /**
   * Returns if is selected. Seriously?
   * @param.i int. item id
   */
  this.isBallSelected = function(i) {
    return ( i == _this.currentPage ) ? true : false;
  };

  /**
   * Switch to selected slide
   * @param.i int. slide id
   */
  this.viewSlide = function(i) {
    _this.currentPage = i;
    var firstElement = document.querySelector('.first-cluster');
    var width = firstElement.offsetWidth * _this.currentPage;
    firstElement.style.marginLeft = '-' + width + 'px';
  };

  /**
   * Horizontal scrolling detection
   * @params event, delta, deltaX, deltaY
   * Doc: see hamster.js + monospaced.mousewheel
   */

  this.scrollLeftNum = 0;
  this.scrollRightNum = 0;

  this.scrolling = function(event, delta, deltaX, deltaY) {

    // Detect right scrolling
    if (deltaX == 1 && deltaY == 0) {
      _this.scrollRightNum++;
      // Prevent multiple scrolls
      if ( _this.scrollRightNum == 3 ) {
        _this.nextSlide();
        setTimeout(function(){
          // reset scroll count after slide transition finishes
          _this.scrollRightNum = 0;
        }, 1000);
      }
    }

    // Detect left scrolling
    if (deltaX == -1 && deltaY == 0) {
      _this.scrollLeftNum++;
      // Prevent multiple scrolls
      if ( _this.scrollLeftNum == 3 ) {
        _this.prevSlide();
        setTimeout(function(){
          // reset scroll count after slide transition finishes
          _this.scrollLeftNum = 0;
        }, 1000);
      }
    }

  };

});