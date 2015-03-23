/**
 *  Muestra diferentes Header según posicion
 */

 $(window).scroll(function() {    
     var scroll = $(window).scrollTop();

     if (scroll >= 500) {
         $(".header").addClass("scrolling");
     } else {
         $(".header").removeClass("scrolling");
     }
 });

/**
 *  Scroll al # correspondiente
 *  Busca enlaces que empiecen con # menos el que solo lleva #
 */
$('a[href*=#]:not([href=#])').click(function () {
  var target = $(this.hash);
  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  if (target.length) {
    $('html,body').animate({
      scrollTop: target.offset().top
    }, 1000);
    return false;
  }
});
