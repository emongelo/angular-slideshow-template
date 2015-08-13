var Slideshow = angular.module('Slideshow', []);

Slideshow.directive('slideshow', function() {
  return {
    restrict: 'A',
    controllerAs: 'slideshow',
    scope: true,
    controller: ['$scope', '$element', '$timeout', function($scope, $element, $timeout){
      var _this = this;
      var element = $element[0];

      this.pager = $element.attr('slideshow-pager') || undefined;
      this.clusters = $element.attr('slideshow-elements') ? JSON.parse($element.attr('slideshow-elements')) : element.querySelectorAll('.slideshow-element-cluster');

      this.currentPage = 0;

      /**
       * Right arrow functionality
       * @param.fast boolean. Used when bullet icon is pressed
       */

      this.nextSlide = function() {
        var arr = $element[0].querySelector('.slideshow-elements');
        var first = angular.element(arr).children()[0];

        if ( this.pager ) {

          _this.currentPage++;
          if ( _this.currentPage == ( _this.clusters.length ) ) {
            _this.currentPage = 0;
          }

          var width = first.offsetWidth * _this.currentPage;
          first.style.marginLeft = '-' + width + 'px';

        } else {

          // No Pager
          var width = first.offsetWidth;
          first.style.marginLeft = '-' + width + 'px';
          _this.transition = false;
          _this.moveLeft = true;

          $timeout(function(){
            _this.moveLeft = false;
            first.removeAttribute('style');
            angular.element(arr).append(first);
          }, 300);

        }

      };

      /**
       * Left arrow functionality
       * @param.fast boolean. Used when bullet icon is pressed
       */
      this.prevSlide = function() {
        var arr = $element[0].querySelector('.slideshow-elements');
        var first = angular.element(arr).children()[0];

        if ( this.pager ) {

          if ( _this.currentPage == 0 ) {
            _this.currentPage = _this.clusters.length;
          }

          _this.currentPage--;


          var width = first.offsetWidth * _this.currentPage;
          first.style.marginLeft = '-' + width + 'px';

        } else {

          // No pager
          var last = angular.element(arr).children()[angular.element(arr).children().length - 1];

          var width = last.offsetWidth;
          angular.element(arr).prepend(last);
          last.style.transition = 'none';
          last.style.marginLeft = '-' + width + 'px';

          $timeout(function(){
            last.removeAttribute('style');
          }, 1);
        }


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
        var firstElement = $element[0].querySelector('.first-cluster');
        var width = firstElement.offsetWidth * _this.currentPage;
        firstElement.style.marginLeft = '-' + width + 'px';
      };

    }],
    link: function(scope, element, attrs) {
    }
  };
});