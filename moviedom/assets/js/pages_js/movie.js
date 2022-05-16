let all_video = document.querySelectorAll(".movie-details-section video");
let video_paly_buttons = document.querySelectorAll(".video-controle-button");
let video = document.querySelector(".movie-trailer");
let cover_pic = document.querySelector(".media-content.movie-cover");
let sound_controlers = document.querySelectorAll(".video-sound-button");
let [play, pause] = ["fa-play", "fa-pause"];
let { mute, unmute } = { mute: "fa-volume-mute", unmute: "fa-volume-up" };
/**
 * Make all video muted
 */
function video_mute() {
  return Array.from(sound_controlers)
    .map((e) => e.className.includes(mute))
    .includes(true)
    ? false
    : true;
}

console.log(video_mute());
function make_all_muted() {
  for (let video of all_video) video.muted = video_mute() ? true : false;
  for (let sound_controler of sound_controlers) {
    if (video_mute()) {
      sound_controler.classList.remove(unmute);
      sound_controler.classList.add(mute);
    } else {
      sound_controler.classList.remove(mute);
      sound_controler.classList.add(unmute);
    }
  }
}
make_all_muted();
// sound controler
for (let sound_controler of sound_controlers) {
  video.muted
    ? sound_controler.classList.add(mute)
    : sound_controler.classList.add(unmute);

  sound_controler.addEventListener("click", make_all_muted);
}

// Play button
for (let play_button of video_paly_buttons) {
  play_button.addEventListener("click", function () {
    let strClass = play_button.className;
    if (strClass.includes("fa-play")) {
      play_button.classList.remove(play);
      play_button.classList.add(pause);
      cover_pic.style.opacity = 0;
      video.style.zIndex = 0;
      video.play();
    } else {
      play_button.classList.remove(pause);
      play_button.classList.add(play);
      cover_pic.style.opacity = 1;
      video.style.zIndex = -3;
      video.pause();
    }
  });
}

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

// cast slider activation
var swiper = new Swiper(".cast-slider", {
  slidesPerView: 5.5,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 5.5,
    },
    768: {
      slidesPerView: 5.5,
    },
    992: {
      slidesPerView: 6.5,
    },
    1100: {
      slidesPerView: 6.5,
    },
    1440: {
      slidesPerView: 7.5,
    },
    1800: {
      slidesPerView: 9.5,
    },
  },
});

// all movies banner slider activation
var swiper = new Swiper(".movies-banner-slider", {
  autoplay: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// trands-menu slider activation
$(".trands-menu-slider").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  rewindNav: false,
  responsive: {
    576: {
      items: 5,
    },
    768: {
      items: 4,
    },
    992: {
      items: 7,
    },
    1100: {
      items: 8,
    },
    1440: {
      items: 9,
      nav: true,
    },
  },
});

$(".owl-carousel").find(".owl-nav").removeClass("disabled");
$(".owl-nav").on("click", function () {
  $(".owl-nav").removeClass("disabled");
});

// single-serise-slider
var swiper = new Swiper(".single-serise-slider", {
  spaceBetween: 15,
  // centeredSlides: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
    1440: {
      slidesPerView: 5,
    },
    1800: {
      slidesPerView: 6,
    },
  },
});

// filter-menu slider activation
var swiper = new Swiper(".filter-menu-az", {
  slidesPerView: 2,
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 12,
    },
    1100: {
      slidesPerView: 14,
    },
    1440: {
      slidesPerView: 20,
    },
  },
});

// trandsnow sldier activation
var swiper = new Swiper(".action-slider", {
  slidesPerView: 6.5,
  spaceBetween: 25,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 5.5,
    },
    768: {
      slidesPerView: 4.3,
    },
    992: {
      slidesPerView: 5.3,
    },
    1100: {
      slidesPerView: 6.5,
    },
    1440: {
      slidesPerView: 7.3,
    },
  },
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

$("#userMovie, #userMovies1, #userMovies2").each(function () {
  // change the number of the "li" elements and the strip will be fine anyway

  var wUl = $(this).find(".wrap-inner").width();
  var nLi = $(this).find(".wrap-inner").children().length;
  var wElement = 100 / nLi;

  $(".movies-col").css("width", wElement + "%");

  // hover "li"

  $(this)
    .find(".movies-col")
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
        $(".movies-col").not(this).css("transform", "translate(0px,  0px)");
      }
    );
});

// mouseover add and remove class
$(document).ready(function () {
  $(".viewed-item, .addMovie-card").hover(
    function () {
      $(this).find(".thumb-text, .card-text").addClass("d-none");
    },
    function () {
      $(this).find(".thumb-text, .card-text").removeClass("d-none");
    }
  );
  $(".viewed-item, .addMovie-card").hover(
    function () {
      $(this).find(".hover-content").addClass("show");
    },
    function () {
      $(this).find(".hover-content").removeClass("show");
    }
  );
  $(".viewed-item").hover(
    function () {
      $(this).find(".imdb-rating").addClass("d-none");
    },
    function () {
      $(this).find(".imdb-rating").removeClass("d-none");
    }
  );
});

// show more item
$(".more-item").click(function () {
  $(".more-movies").slideToggle();
  // if ($('.more-item').text() == "") {
  //   $(this).text("")
  // } else {
  //   $(this).text("")
  // }
});
