(function () {
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

  var poster_cards = document.querySelectorAll(".poster-card");
  var poster_images = document.querySelectorAll(".poster-img");
  var poster_covers = document.querySelectorAll(".poster-cover");
  var poster_sound = document.querySelectorAll(".poster-sound-controller");
  var poster_videos = document.querySelectorAll(".poster-video");

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
      var poster_cover = poster_covers[i];
      var poster_video = poster_videos[i];
      poster_img.style.opacity = 0;
      poster_cover.style.opacity = 1;
      poster_video.style.opacity = 0;
      poster_video_on = setTimeout(() => {
        poster_cover.style.opacity = 0;
        poster_video.style.opacity = 1;
        poster_video.play();
      }, 2000);
    });
    poster_cards[i].addEventListener("mouseleave", function () {
      var poster_img = poster_images[i];
      var poster_cover = poster_covers[i];
      var poster_video = poster_videos[i];
      poster_img.style.opacity = 1;
      poster_cover.style.opacity = 0;
      poster_video.style.opacity = 0;
      poster_video.pause();
      clearTimeout(poster_video_on);
    });
  }

  var poster_slider = new Swiper(".poster-slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    freeMode: true,
    loop: true,
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

  // tranding slider activation
  // var swiper = new Swiper(".tranding-slider", {
  //   slidesPerView: 2.5,
  //   spaceBetween: 10,
  //   loop: true,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   breakpoints: {
  //     768: {
  //       slidesPerView: 2.5,
  //     },
  //     992: {
  //       slidesPerView: 3.5,
  //     },
  //     1100: {
  //       slidesPerView: 4.6,
  //     },
  //     1440: {
  //       slidesPerView: 6.5,
  //     },
  //   },
  // });

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
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 6,
      },
      992: {
        slidesPerView: 7,
      },
      1100: {
        slidesPerView: 8,
      }
    },
  });

  // subscrip slider activation
  var swiper = new Swiper(".actors-home-slider", {
    slidesPerView: 6.3,
    spaceBetween: 15,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 5.3,
      },
      768: {
        slidesPerView: 5.3,
      },
      992: {
        slidesPerView: 6.3,
      },
      1100: {
        slidesPerView: 7.3,
      },
      1440: {
        slidesPerView: 8.3,
      },
    },
  });

  // simple parallax
  var image = document.getElementsByClassName("thumbnail");
  new simpleParallax(image, {
    delay: 0.6,
    transition: "cubic-bezier(0,0,0,1)",
  });

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

  $("#searchList").keyup(function () {
    // $('#SearchArea').addClass('show')
    if ($(this).val() == "") {
      $("#SearchArea").removeClass("show");
    } else {
      $("#SearchArea").addClass("show");
    }
  });
  $("#searchList").on("click", function () {
    $("#SearchArea").toggleClass("show");
  });
  $(".search-input-close").on("click", function () {
    $("#SearchArea").removeClass("show");
  });

  // mouseover add and remove class
  $(document).ready(function () {
    $(".viewed-item").hover(
      function () {
        $(this).find('.thumb-text').addClass("d-none");
      },
      function () {
        $(this).find('.thumb-text').removeClass("d-none");
      }
    );
    $(".viewed-item").hover(
      function () {
        $(this).find('.hover-content').addClass("show");
      },
      function () {
        $(this).find('.hover-content').removeClass("show");
      }
    );
    $(".viewed-item").hover(
      function () {
        $(this).find('.imdb-rating').addClass("d-none");
      },
      function () {
        $(this).find('.imdb-rating').removeClass("d-none");
      }
    );
});

})(jQuery);
