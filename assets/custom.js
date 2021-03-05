/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */

/**
 * Slider
 */
jQuery(function ($) {
  const selectors = {
		featureBlocks: '.s-feature-blocks .swiper-container',
		relatedContent: '.s-related-content .swiper-container',
		benefitIngredients: '.s-benefit-ingredients .swiper-container',
		theTeam: '.s-team .swiper-container',
  };

  if (window.innerWidth < 768) {
    const featureBlocksSlider = new Swiper(selectors.featureBlocks, {
      slidesPerView: 2,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      }
    });

    const relatedContentSlider = new Swiper(selectors.relatedContent, {
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      }
    });

    const benefitIngredientsSlider = new Swiper(selectors.benefitIngredients, {
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      }
    });

    const theTeamSlider = new Swiper(selectors.theTeam, {
      slidesPerView: 1,
      loop: true,
      slidesPerView: 1.25,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      }
    });
  }
});

/**
 * Section video
 */
jQuery(function ($) {
  const selectors = {
		btnPlay: '.s-video__btn-play',
		vedioContainer: '.s-video__content',
  };

  $(selectors.btnPlay).on('click', function() {
    $(this).closest(selectors.vedioContainer).addClass('playing');
  });
});/**


/* Scroll to products at benefits pages
 */
jQuery(function ($) {
  
  $(document).ready(function() {

    $('.template-index .timeline__button').each(function(){
      var t = $(this);
      t.attr('href', t.attr('href') + '#shop');
    });

    if (window.location.href.indexOf("#shop") > -1) {
      if ($('body').hasClass('template-page') && $('.s-benefit-products').length > 0){
        var elementOffset = document.querySelector('.s-benefit-products').getBoundingClientRect().top - parseInt(document.documentElement.style.getPropertyValue('--header-height'));
        window.scrollBy({ top: elementOffset, behavior: 'smooth' }); 
      }
    }
  });

});

/* Equal height blocks at lab test page */
jQuery(function ($) {
  
  $(document).ready(function() {


    // var $carousel = $('.display-desktop .Carousel').flickity();
    // $carousel.flickity('destroy');

    $(".bh-slideshow__title:contains('%')").html(function(_, html) {
       return html.replace(/(%)/g, '<span class="futura">$1</span>');
    });

    if ($('.labs-page__grid').length > 0) {
      var currentTallest = 0;
      var currentRowStart = 0;
      var rowDivs = new Array();

      function setConformingHeight(el, newHeight) {
       // set the height to something new, but remember the original height in case things change
       el.data("originalHeight", (el.data("originalHeight") == undefined) ? (el.height()) : (el.data("originalHeight")));
       el.height(newHeight);
      }

      function getOriginalHeight(el) {
       // if the height has changed, send the originalHeight
       return (el.data("originalHeight") == undefined) ? (el.height()) : (el.data("originalHeight"));
      }

      function columnConform() {

       // find the tallest DIV in the row, and set the heights of all of the DIVs to match it.
       $('.labs-page__product-container').each(function(index) {

        if(currentRowStart != $(this).position().top) {

         // we just came to a new row.  Set all the heights on the completed row
         for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) setConformingHeight(rowDivs[currentDiv], currentTallest);

         // set the variables for the new row
         rowDivs.length = 0; // empty the array
         currentRowStart = $(this).position().top;
         currentTallest = getOriginalHeight($(this));
         rowDivs.push($(this));

        } else {

         // another div on the current row.  Add it to the list and check if it's taller
         rowDivs.push($(this));
         currentTallest = (currentTallest < getOriginalHeight($(this))) ? (getOriginalHeight($(this))) : (currentTallest);

        }
        // do the last row
        for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) setConformingHeight(rowDivs[currentDiv], currentTallest);

       });

      }


      $(window).resize(function() {
       columnConform();
      });

      $(document).ready(function() {
       columnConform();
      });

    }


  });

});


/**
 * Section FAQ's
 */
jQuery(function ($) {

  var questions = $(".s-faq__question");
  questions.each(function( index ) {
    idLink = index + 1;
    $(this).attr("id", "q" + idLink);
  });

  const selectors = {
		question: '.s-faq__question',
		answer: '.s-faq__answer',
  };

  $(selectors.question).click(function() {
    $(this).toggleClass('opened').siblings(selectors.answer).slideToggle();
    hashID = "#fa" + $(this).attr("id");
    window.location.hash = hashID;
    return false;
  });

  if ($("body").hasClass("page.education")){
    if(location.hash && location.hash.length) {
      var hashS = decodeURIComponent(location.hash.substr(3));
      hashS = $("#" + hashS);
      console.log("scroll");
      scrollP = hashS.offset().top - $("header").height() - 50;
      hashS.click();
      setTimeout(function(){  
        $('html, body').animate({scrollTop: scrollP}, 500);
      }, 1000);
    }  
  }
  
 
});

/**
 * Landing page - Add to Cart
 */

jQuery(function ($) {
  $(document).on('click', '.ProductItem_AddToCart', function() {
    var qty = $(this).data('qty');
    var id = $(this).data('id');
    if (id) {
      var checkout = 'https://healistnaturals.com/cart/' + id + ':' + qty + '?channel=buy_button';
      /*function createPopupWin(pageURL, pageTitle, popupWinWidth, popupWinHeight) { 
        var left = (screen.width - popupWinWidth) / 2 ; 
        var top = (screen.height - popupWinHeight ) / 2 ; 
        var myWindow = window.open(pageURL, pageTitle,  
                                   'resizable=yes, width=' + popupWinWidth 
                                   + ', height=' + popupWinHeight + ', top=' 
                                   + top + ', left=' + left); 
      } */
      //createPopupWin(checkout, '', 500, 650);  
      //localStorage.setItem('DRTV', 'true');
      window.location.href = checkout;
    }
  });
});