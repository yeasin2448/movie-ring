(function ($) {
  "use strict";

  //sidebar top fixed start
  var fixed_top = $(".header-sticky");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 80) {
      fixed_top.addClass("menu-fixed animated fadeInDown");
      fixed_top.removeClass("slideInUp");
      $("body").addClass("body-padding");
    } else {
      fixed_top.removeClass("menu-fixed fadeInDown");
      fixed_top.addClass("slideInUp");
      $("body").removeClass("body-padding");
    }
  });

  //menu side bar
  $(".movie-sliderBtn").on("click", function () {
    $(".movie-sidebar,.body-overlay").toggleClass("active");
  });

  $("#croseBtn").on("click", function () {
    $(".movie-sidebar,.body-overlay,.movie-sliderBtn").removeClass("active");
  });

  $(".movie-sliderBtn").on("click", function () {
    $(".movie-sliderBtn").toggleClass("active");
  });

  // remove overlay
  $(".body-overlay").on("click", function () {
    $(".movie-sidebar,.body-overlay,.movie-sliderBtn").removeClass("active");
  });

  //  Bookmark & Search
  var $filename = $(".search-input input").data("search"),
    navLinkSearch = $(".search-bar"),
    searchInput = $(".search-input"),
    searchInputInputfield = $(".search-input input"),
    searchList = $(".search-input .search-list"),
    appContent = $(".app-content");

  // Navigation Search area Open
  navLinkSearch.on("click", function () {
    var $this = $(this);
    var searchInput = $(this).parent(".item-list").find(".search-input");
    searchInput.addClass("open");
    searchInputInputfield.focus();
    searchList.find("li").remove();
  });

  // Navigation Search area Close
  $(".search-input-close i").on("click", function () {
    var $this = $(this),
      searchInput = $(this).closest(".search-input");
    if (searchInput.hasClass("open")) {
      searchInput.removeClass("open");
      searchInputInputfield.val("");
      searchInputInputfield.blur();
      searchList.removeClass("show");
      appContent.removeClass("show-overlay");
    }
  });

  // Scroll To Top
  var scrollTop = $(".scrollToTop");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() < 500) {
      scrollTop.removeClass("active");
    } else {
      scrollTop.addClass("active");
    }
  });

  //Click event to scroll to top
  $(".scrollToTop").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });

  /**
   * --------------------------------
   * Video background controller ;
   * ---------------------------------
   */
  var sound_button = document.querySelector(".sound-button");
  var bg_videos = document
    .querySelector(".banner-slides")
    .querySelectorAll("video");
  var bg_video_posters = document
    .querySelector(".banner-slides")
    .querySelectorAll("img");
  /**
   * video controller
   */
  function video_mute() {
    var mute = "fa-volume-mute";
    var strClass = sound_button.className;
    for (let video of bg_videos) {
      if (strClass.includes(mute)) {
        video.muted = false;
      } else {
        video.muted = true;
      }
    }
  }
  video_mute();

  /**
   * video mute unmute button handler;
   */
  sound_button.addEventListener("click", function (e) {
    var { mute, unmute } = { mute: "fa-volume-mute", unmute: "fa-volume-up" };
    var strClass = e.target.className;
    var listClass = e.target.classList;
    if (strClass.includes(mute)) {
      listClass.remove(mute);
      listClass.add(unmute);
    } else {
      listClass.remove(unmute);
      listClass.add(mute);
    }
    video_mute();
  });
  function video_controller(index) {
    for (var i = 0; i < bg_videos.length; i++) {
      bg_videos[i].pause();
    }
    setTimeout(() => {
      var currentVideo = bg_videos[index];
      var video_duration = currentVideo.duration * 1000;
      // when the video is end then show the img again and hide the video again.
      setTimeout(() => {
        bg_video_posters[index].style.opacity = 1;
        currentVideo.style.opacity = 0;
      }, video_duration);
      // when the video stated then hide the  the img again and show the the video again.
      bg_video_posters[index].style.opacity = 0;
      currentVideo.style.opacity = 1;
      currentVideo.play();
    }, 1000);
  }

  function bg_video_handler(index) {
    video_controller(index);
  }
  bg_video_handler(0);
  /**
   * On scroll video off
   */
  function on_scroll_video_off(index) {
    document.onscroll = function () {
      var currentVideo = bg_videos[index];
      const screen_height = window.innerHeight;
      const scroll_height = window.scrollY;
      const video_volume = Math.cos(scroll_height / screen_height);
      if (video_volume >= 0 && video_volume <= 1) {
        video_volume > 0.9 ? currentVideo.play() : currentVideo.pause();
        currentVideo.volume = video_volume;
      } else {
        currentVideo.pause();
      }
    };
  }
  on_scroll_video_off(0);
  /**
   * -------------------------------------------------------
   * Video background controller ;
   * -------------------------------------------------------
   */

  // banner slider activaton
  var banners = new Swiper(".banner-slides", {
    effect: "fade",
    allowTouchMove: false,
    on: {
      slideChange: function (e) {
        let active_slide_index = e.activeIndex;
        bg_video_handler(active_slide_index);
        on_scroll_video_off(active_slide_index);
      },
    },
  });
  var thumbs_slides = new Swiper(".thumbs", {
    slidesPerView: 5.5,
    spaceBetween: 20,
    loop: true,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
    thumbs: {
      swiper: banners,
    },
  });

  /**
   * -------------------
   * feature tabs
   * -------------------
   */

  var poster_cards = $(".poster-card");
  var poster_images = $(".poster-img");
  var poster_sound = $(".poster-sound-controller");
  var poster_videos = $(".poster-video");

  for (let i = 0; i < poster_cards.length; i++) {
    poster_sound[i].addEventListener("click", function (e) {
      var { mute, unmute } = { mute: "fa-volume-mute", unmute: "fa-volume-up" };
      var strClass = e.target.className;
      var listClass = e.target.classList;
      if (strClass.includes(mute)) {
        listClass.remove(mute);
        listClass.add(unmute);
        for (let video of poster_videos) video.muted = false;
      } else {
        listClass.remove(unmute);
        listClass.add(mute);
        for (let video of poster_videos) video.muted = true;
      }
    });
    let poster_video_on;
    poster_cards[i].addEventListener("mouseenter", function () {
      var poster_img = poster_images[i];
      var poster_video = poster_videos[i];
      poster_video_on = setTimeout(() => {
        poster_img.style.opacity = 0;
        poster_video.style.opacity = 1;
        poster_video.play();
      }, 2000);
    });
    poster_cards[i].addEventListener("mouseleave", function () {
      var poster_img = poster_images[i];
      var poster_video = poster_videos[i];
      poster_img.style.opacity = 1;
      poster_video.style.opacity = 0;
      poster_video.pause();
      clearTimeout(poster_video_on);
    });
  }

  var poster_slider = new Swiper(".poster-slider", {
    slidesPerView: 6,
    spaceBetween: 30,
    slidesPerGroup: 5,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      920: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 8,
        spaceBetween: 20,
      },
      1441: {
        slidesPerView: 10,
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /**
   * --------------------------
   */

  // Featured slider avtivation
  var swiper = new Swiper(".featured-slider", {
    slidesPerView: 8,
    loop: true,
    spaceBetween: 15,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 7,
      },
      1100: {
        slidesPerView: 8,
      },
    },
  });

  // watching slider activation
  var swiper = new Swiper(".watching-slider", {
    slidesPerView: 2,
    spaceBetween: 15,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
      },
      992: {
        slidesPerView: 3.5,
      },
      1100: {
        slidesPerView: 5,
      },
    },
  });

  // tranding slider activation
  var swiper = new Swiper(".tranding-slider", {
    slidesPerView: 2.5,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1100: {
        slidesPerView: 4,
      },
      1440: {
        slidesPerView: 6,
      },
    },
  });

  // recent slider activation
  var swiper = new Swiper(".viewed-slider", {
    slidesPerView: 2,
    spaceBetween: 15,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 6,
      },
      1100: {
        slidesPerView: 7,
      },
    },
  });

  //creating a style object for the ripple effect
  function RippleStyle(width, height, posX, posY) {
    this.width = width <= height ? height : width;
    this.height = width <= height ? height : width;
    this.top = posY - this.height * 0.5;
    this.left = posX - this.width * 0.5;
  }
  $(".btn").on("mousedown", function (e) {
    //appending an element with a class name "btn-ripple"
    var rippleEl = $('<span class="btn-ripple"></span>').appendTo(this);

    //getting the button's offset position
    var pos = $(this).offset();

    //get the button's width and height
    var width = $(this).outerWidth();
    var height = $(this).outerHeight();

    //get the cursor's x and y position within the button
    var posX = e.pageX - pos.left;
    var posY = e.pageY - pos.top;

    //adding a css style to the ripple effect
    var rippleStyle = new RippleStyle(width, height, posX, posY);
    rippleEl.css(rippleStyle);
  });

  //this event listener will be triggered once the ripple animation is done
  $(".btn").on(
    "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
    ".btn-ripple",
    function () {
      $(this).remove();
    }
  );

  // chate button
  $(document).on("click", ".media-btn, .media-close", function () {
    $(".social-media").toggleClass("open");
  });

  // simple parallax
  var image = document.getElementsByClassName("thumbnail");
  new simpleParallax(image, {
    delay: 0.6,
    transition: "cubic-bezier(0,0,0,1)",
  });

  // watching slider padd remove
  // $(document).ready(function () {
  //   $("#paddRemove").on("click", function () {
  //     $(".padding-remove")({
  //       paddingLeft: "0",
  //     });
  //     setTimeout(function () {
  //       $(".padding-remove").animate({
  //         overflow: "visible",
  //       });
  //     }, 1);
  //   });
  // });
  // trading slider padd remove
  $('#paddRemove').on('click', function() {
    $('.padding-remove').addClass('p-0');
  })

  //Count Down JAva Script
  $(".countdown").countdown({
    date: "01/15/2023 05:00:00",
    offset: +2,
    day: "Day",
    days: "Days",
  });

  //preloading for page
  $(window).on("load", function () {
    // makes sure the whole site is loaded
    var status = $("#status");
    var preloader = $("#preloader");
    var body = $("body");
    status.fadeOut(); // will first fade out the loading animation
    preloader.delay(0).fadeOut("fast"); // will fade out the white DIV that covers the website.
    body.delay(0).css({ overflow: "visible" });
    var vidDefer = document.getElementsByTagName("iframe");
    for (var i = 0; i < vidDefer.length; i++) {
      if (vidDefer[i].getAttribute("data-src")) {
        vidDefer[i].setAttribute("src", vidDefer[i].getAttribute("data-src"));
      }
    }
  });

  // lightcase activation//
  $("a[data-rel^=lightcase]").lightcase();

  $("section").each(function () {
    // change the number of the "li" elements and the strip will be fine anyway

    var wUl = $(this).find(".viewed-wrapper").width();
    var nLi = $(this).find(".viewed-wrapper").children().length;
    var wElement = 100 / nLi;

    $(".viewed-slide").css("width", wElement + "%");

    // hover "li"

    $(this)
      .find(".viewed-slide")
      .hover(
        // mouse In
        function () {
          $(this).toggleClass("hover");

          var scaleFactor = 1.5;
          var wBigElement = $(this).width() * scaleFactor;
          var translation = (wBigElement - $(this).width()) / 2;

          var item = $(this).parent().children();

          $(this).css("transform", "scale(" + scaleFactor + ")");

          if ($(this).is(":nth-child(1)")) {
            item
              .slice(1, nLi)
              .css("transform", "translate(" + translation * 2 + "px,  0px)");
          }

          for (var i = 2; i <= nLi - 1; i++) {
            if ($(this).is(":nth-child(" + i + ")")) {
              item
                .slice(0, i - 1)
                .css("transform", "translate(-" + translation + "px,  0px)")
                .end()
                .slice(i)
                .css("transform", "translate(" + translation + "px,  0px)");
            }
          }

          if ($(this).is(":nth-child(" + nLi + ")")) {
            item
              .slice(0, nLi - 1)
              .css("transform", "translate(-" + translation * 2 + "px,  0px)");
          }

          // mouse Out
        },
        function () {
          $(this).toggleClass("hover");
          $(this).css("transform", "scale(1)");
          $(".viewed-slide").not(this).css("transform", "translate(0px,  0px)");
        }
      );
  });
})(jQuery);
