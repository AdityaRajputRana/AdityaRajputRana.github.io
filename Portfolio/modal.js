$(document).ready(function(){

    // MODAL
    var modalText = {
      roambi: {
        title: 'One Weather',
        tag: 'ANDROID APP',
        detail: 'One Weather provides weather forcast and current weather conditions. Technologies used - GPS, Rest API',
        link: 'https://play.google.com/store/apps/details?id=com.matgrams.oneweather'
      },
      mystand: {
        title: 'Bhojpuriya Tadka',
        tag: 'YOUTUBE CHANNEL APP',    
        detail: 'Bhojpuriya Tadka is a app converted out of Youtube Channel. Developed with Android Studio with the help of Youtube Data APIs V 3.0 Features- Video List in beautifull Card View, Push Notifications, Analytics and social media sharing.',
        link: 'https://play.google.com/store/apps/details?id=com.techtoall.bhojpuriyatadka'
      },
      movie: {
        title: 'Cinema Movies Box',
        tag: 'TV SHOWS AND MOVIES',
        detail: 'Cinema Movies Box shows deatils, Ratings, Cast and Description of new and latest movies and shows. Developed with Android Studio. Features- Movies and Shows List in beautifull Card View, Push Notifications, Analytics and social media sharing.',
        link: 'https://play.google.com/store/apps/details?id=com.free.shows347.mov340'
      },
      rehub: {
        title: 'Real Estate Hub',
        tag: 'BUY RENT OR SELL PROPERTIES',    
        detail: 'Real Este Hub is the app where people can register with Google Authentication. Users View Buy Sell Rent Rate or comment on Properties . Developed with Android Studio, PHP, MySql, and FTP Protocol.'
      },
    };

    $('#gallery .button').on('click', function(){
      fillModal(this.id);
      $('.modal-wrap').addClass('visible');
    });
  
    $('.close').on('click', function(){
      $('.modal-wrap, #modal .button').removeClass('visible');
    });
  
    $('.mask').on('click', function(){
      $('.modal-wrap, #modal .button').removeClass('visible');
    });

    var carousel = $('#carousel'),
        slideWidth = 700,
        threshold = slideWidth/3,
        dragStart, 
        dragEnd;
  
    setDimensions();
  
    $('#next').click(function(){ shiftSlide(-1) })
    $('#prev').click(function(){ shiftSlide(1) })
  
    carousel.on('mousedown', function(){
      if (carousel.hasClass('transition')) return;
      dragStart = event.pageX;
      $(this).on('mousemove', function(){
        dragEnd = event.pageX;
        $(this).css('transform','translateX('+ dragPos() +'px)');
      });
      $(document).on('mouseup', function(){
        if (dragPos() > threshold) { return shiftSlide(1) }
        if (dragPos() < -threshold) { return shiftSlide(-1) }
        shiftSlide(0);
      });
    });
  
    function setDimensions() {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       slideWidth = $(window).innerWidth();
      }
      $('.carousel-wrap, .slide').css('width', slideWidth);
      $('.modal').css('max-width', slideWidth);
      $('#carousel').css('left', slideWidth * -1)
    }
  
    function dragPos() {
      return dragEnd - dragStart;
    }
  
    function shiftSlide(direction) {
      if (carousel.hasClass('transition')) return;
      dragEnd = dragStart;
      $(document).off('mouseup')
      carousel.off('mousemove')
              .addClass('transition')
              .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
      setTimeout(function(){
        if (direction === 1) {
          $('.slide:first').before($('.slide:last'));
        } else if (direction === -1) {
          $('.slide:last').after($('.slide:first'));
        }
        carousel.removeClass('transition')
        carousel.css('transform','translateX(0px)'); 
      },700)
    }
  
    function fillModal(id) {
      $('#modal .title').text(modalText[id].title);
      $('#modal .detail').text(modalText[id].detail);
      $('#modal .tag').text(modalText[id].tag);
      if (modalText[id].link) $('#modal .button').addClass('visible')
                                                 .parent()
                                                 .attr('href', modalText[id].link)
  
      $.each($('#modal li'), function(index, value ) {
        $(this).text(modalText[id].bullets[index]);
      });
      $.each($('#modal .slide'), function(index, value) {
        $(this).css({
          background: "#ffffff url('images/" + id + '-' + index + ".png') bottom no-repeat",
          backgroundSize: 'auto 100%'
                });
                
      });
    }
  })
  