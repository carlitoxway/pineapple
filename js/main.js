
/* VALIDADOR DE FORMULARIO
---------------------------------------------------------------------------------------------------------------*/ 
  $.validator.setDefaults({
    submitHandler: function() {
      alert("submitted!");
    }
  });

  $().ready(function() {
    // validate the comment form when it is submitted
    $("#commentForm").validate();

    // validate signup form on keyup and submit
    $("#signupForm").validate({
      rules: {
        firstname: "required",
        lastname: "required",
        username: {
          required: true,
          minlength: 2
        },
        password: {
          required: true,
          minlength: 5
        },
        confirm_password: {
          required: true,
          minlength: 5,
          equalTo: "#password"
        },
        email: {
          required: true,
          email: true
        },
        topic: {
          required: "#newsletter:checked",
          minlength: 2
        },
        agree: "required"
      },
      messages: {
        firstname: "Please enter your firstname",
        lastname: "Please enter your lastname",
        username: {
          required: "Please enter a username",
          minlength: "Your username must consist of at least 2 characters"
        },
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        confirm_password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long",
          equalTo: "Please enter the same password as above"
        },
        email: "Please enter a valid email address",
        agree: "Please accept our policy"
      }
    });

    // propose username by combining first- and lastname
    $("#username").focus(function() {
      var firstname = $("#firstname").val();
      var lastname = $("#lastname").val();
      if (firstname && lastname && !this.value) {
        this.value = firstname + "." + lastname;
      }
    });

    //code to hide topic selection, disable for demo
    var newsletter = $("#newsletter");
    // newsletter topics are optional, hide at first
    var inital = newsletter.is(":checked");
    var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
    var topicInputs = topics.find("input").attr("disabled", !inital);
    // show when newsletter is checked
    newsletter.click(function() {
      topics[this.checked ? "removeClass" : "addClass"]("gray");
      topicInputs.attr("disabled", !this.checked);
    });
  });


/* CAROUSEL
---------------------------------------------------------------------------------------------------------------*/ 

  $(function() {
    var $slides = $('#super-slide');

    Hammer($slides[0]).on("swipeleft", function(e) {
      $slides.data('superslides').animate('next');
    });

    Hammer($slides[0]).on("swiperight", function(e) {
      $slides.data('superslides').animate('prev');
    });

    $slides.superslides({
      animation: 'fade'
    });
  });

  // $(function() {
  //   $('#super-slide').superslides({
  //     animation: 'fade'
  //   });

  // });


  $('.carousel').owlCarousel({
      loop:true,
      margin:10,
      dots:true,
      autoplay:true,
      autoplayHoverPause:true,
      autoplaySpeed:1200,
      autoplayTimeout:5000,
      navText:false,
      nav:true,
      responsive:{
          0:{
              items:1
          },
          320:{
              items:1
          },
          768:{
              items:1
          }
          // 922:{
          //     items:3
          // }
      }
  });



/* ANIMACIÓN DE MENU HEADER Y OTROS
---------------------------------------------------------------------------------------------------------------*/ 
 $(window).scroll(function() {    
     var scroll = $(window).scrollTop();

     if (scroll >= 500) {
         $(".header").addClass("scrolling");
         $(".navbar-header").addClass("scrolling");
     } else {
         $(".header").removeClass("scrolling");
         $(".navbar-header").removeClass("scrolling");
     }
     if (scroll >= 250) {
         $(".principal-img").addClass("scrolling");
     } else {
         $(".principal-img").removeClass("scrolling");
     }
 });


 /* ACCORDION
 ---------------------------------------------------------------------------------------------------------------*/ 
 $(document).ready(function() {
     // Collapsible Menu
     function accordion(trigger) {
         //variables
         var $button = $(trigger),//trigger firing the event
             visible = true;//flag for wayfinding

             $button.hover().css({'cursor': 'pointer'});

         //event
         $button.click(function() {
             //conditional check
             if ( ! visible ) {
                 $button.removeClass('active');
                 $('.panel-title .icon').html('&oplus;');


                 $(this).next().slideUp('slow',function() {
                     $(this).addClass('visuallyhidden').slideDown(0);
                     $('.panel-content').attr( 'aria-expanded','false' );
                 });
             }else {
                 $button.addClass('active');
                 $('.panel-title.active .icon').html('&otimes;');

                 $(this).next().slideUp(0,function() {
                     $('.panel-content').attr( 'aria-expanded','true' );
                     $(this).removeClass('visuallyhidden').slideDown('slow');
                 });
             }

             //flag dude
             visible = !visible;
             return false
         });
     }

     //call to widget trigger1
     accordion('#trigger1');
     //call to widget trigger2
     accordion('#trigger2');
     //call to widget trigger3
     accordion('#trigger3');
     //call to widget trigger3
     accordion('#trigger4');

 });


/* SMOOTH SCROLL 
---------------------------------------------------------------------------------------------------------------*/ 
  $('a[href*=#menu]:not([href=#menu])').click(function () {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  });


/* INSTAGRAM
---------------------------------------------------------------------------------------------------------------*/ 
  function createPhotoElement(photo) {
    var innerHtml = $('<img>')
      .addClass('instagram-image')
      .attr('src', photo.images.standard_resolution.url);

    innerHtml = $('<a>')
      .attr('target', '_blank')
      .attr('href', photo.link)
      .append(innerHtml);

    return $('<div>')
      .addClass('instagram-placeholder')
      .attr('id', photo.id)
      .append(innerHtml);
  };

  function didLoadInstagram(event, response) {
    var that = this;

    $.each(response.data, function(i, photo) {
      $(that).append(createPhotoElement(photo));
    });
  };

  $(document).ready(function() {
    var clientId = 'baee48560b984845974f6b85a07bf7d9';

    $('.instagram.personal').on('didLoadInstagram', didLoadInstagram);
    $('.instagram.personal').instagram({
      userId: 1670713,
      accessToken: '1670713.6a48ce3.1229fb46de13484db22cc9b82c9b8f4f' ,
      count: 8,
    });
    // $('.instagram.location').on('didLoadInstagram', didLoadInstagram);
    // $('.instagram.location').instagram({
    //   userId: 184751484,
    //   accessToken: '1670713.6a48ce3.1229fb46de13484db22cc9b82c9b8f4f' ,
    //   count: 6,
    // });

    // $('.instagram.location').on('didLoadInstagram', didLoadInstagram);
    // $('.instagram.location').instagram({
    //   location: {
    //     id: 514276
    //   },
    //   count: 5,
    //   clientId: 1589308465
    // });
    
    // $('.instagram.search').on('didLoadInstagram', didLoadInstagram);
    // $('.instagram.search').instagram({
    //   search: {
    //     lat: 48.858844,
    //     lng: 2.294351
    //   },
    //   count: 5,
    //   clientId: clientId
    // });



    // // Arrancamos con has madrid por defecto
    // hasInitialize('madrid');

    // // Declaration
    // // Vacia el DIV instagram tag
    // // Cuando hay carga de fotos los carga
    // // Le dice a instagram que le de 80 del hash hash para el client id
    // function hasInitialize (hash) { 
    //   $('.instagram.tag').on('didLoadInstagram', didLoadInstagram);
    //   $('.instagram.tag').instagram({
    //     hash:hash,
    //     count: 28,
    //     clientId: clientId
    //   });
    // };

    // // Cuando hacemos input le decimos que llame a hasInitialize con un nuevo hash
    // $('#hashtag').change(function(){ 
    //   $('.instagram.tag').html("");
    //   // $('.instagram.tag').empty(); // Puede provocar overload de memoria (empty no vacia el DOM realmente)
    //     hasInitialize($('#hashtag').val());
    // });
  });


/* COLORBOX
---------------------------------------------------------------------------------------------------------------*/ 
    $(document).ready(function(){
      $(".modal-pic").colorbox({rel:'modal-pic', maxWidth:"85%", reposition:true,scalePhotos: true,});
    });


