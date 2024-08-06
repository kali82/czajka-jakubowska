var vw = window.innerWidth;
var vh = window.innerHeight;

var pad = 1;
var minWidth = 200;
var maxWidth = 300;
var bubbleHeight = 200;

var elastic = Elastic.easeOut.config(0.3, 0.3);

var imageUrls = [
  "../images/updatedTeam/1.png",
  "../images/updatedTeam/2.jpg",
  "../images/updatedTeam/3.jpg",
  "../images/updatedTeam/4.jpg",
  "../images/updatedTeam/5.png",
  "../images/updatedTeam/6.png",
  "../images/updatedTeam/7.jpg",
  // Add more image paths as needed
];

var bubbles = [];

for (var i = 0; i < 200; i++) {
  var bubble = createBubble(i);
  bubbles.push(bubble);
  placeBubble(bubble);
}

window.addEventListener("resize", resize);

function placeBubble(bubble) {
  bubble.placed = true;
  bubble.width = randomInt(minWidth, maxWidth);
  bubble.left = randomInt(pad, vw - (bubble.width + pad));
  bubble.top = randomInt(pad, vh - (bubble.height + pad));
  bubble.right = bubble.left + bubble.width;
  bubble.bottom = bubble.top + bubble.height;

  // Loop through all bubbles
  for (var i = 0; i < bubbles.length; i++) {
    var b = bubbles[i];

    // Skip if b is this bubble or isn't placed
    if (b === bubble || !b.placed) {
      continue;
    }

    // Collision detected, can't place bubble
    if (intersects(bubble, b)) {
      bubble.placed = false;
      break;
    }
  }

  if (bubble.placed) {
    // No collisions detected. It's place is reserved and we can animate to it
    animateBubble(bubble);
  } else {
    // Can't place bubble. Try again on next animation frame
    requestAnimationFrame(function () {
      placeBubble(bubble);
    });
  }
}

function animateBubble(bubble) {
  TweenLite.set(bubble.element, {
    width: bubble.width,
    x: bubble.left,
    y: vh,
  });

  var tl = new TimelineLite({
    onComplete: placeBubble,
    onCompleteParams: [bubble],
  })
    .to(
      bubble.element,
      random(0.5, 2),
      { autoAlpha: 1, y: bubble.top, ease: elastic },
      random(10)
    )
    .add("leave", "+=" + random(5, 10))
    .add(function () {
      bubble.placed = false;
    }, "leave") // When bubble is leaving, it is no longer placed
    .to(bubble.element, random(0.5, 2), { autoAlpha: 0, y: -vh }, "leave");
}

function createBubble(index) {
  var element = document.createElement("div");
  document.querySelector(".bubble-container").appendChild(element);
  element.className = "bubble";
  element.style.height = bubbleHeight + "px";
  element.style.width = bubbleHeight + "px"; // Ensure the bubbles are round
  element.style.backgroundImage =
    "url(" + imageUrls[index % imageUrls.length] + ")";
  element.style.backgroundRepeat = "no-repeat";
  element.style.backgroundSize = "contain";
  element.style.backgroundPosition = "center";
  // element.style.borderRadius = "20px"
  // //  element.style.background = "url(" + imageUrls[index % imageUrls.length] + ")";
  // element.style.background = "url(./images/updatedTeam/1.png)";
  return {
    element: element,
    placed: false,
    width: minWidth,
    height: bubbleHeight,
    left: 0,
    top: 0,
    right: minWidth,
    bottom: bubbleHeight,
  };
}

function intersects(a, b) {
  return !(
    b.left > a.right + pad ||
    b.right < a.left - pad ||
    b.top > a.bottom + pad ||
    b.bottom < a.top - pad
  );
}

function resize() {
  vw = window.innerWidth;
  vh = window.innerHeight;
}

function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  if (min > max) {
    var tmp = min;
    min = max;
    max = tmp;
  }
  return min + (max - min) * Math.random();
}

function randomInt(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  if (min > max) {
    var tmp = min;
    min = max;
    max = tmp;
  }
  return Math.floor(min + (max - min + 1) * Math.random());
}

////////////////////////////////////////////////////
function moveTocContactSection() {
  const element = document.getElementById("contactSection");
  //you can do it by jquery. no matter
  element.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}
(function ($) {
  "use strict";

  // SCROLL TO TOP

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 70) {
      $(".backtop").addClass("reveal");
    } else {
      $(".backtop").removeClass("reveal");
    }
  });

  $(".portfolio-single-slider").slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $(".clients-logo").slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });

  $(".testimonial-wrap").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    vertical: true,
    verticalSwiping: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".testimonial-wrap-2").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  var map;

  function initialize() {
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(50.97797382271958, -114.107718560791),
      // styles: style_array_here
    };
    map = new google.maps.Map(
      document.getElementById("map-canvas"),
      mapOptions
    );
  }

  var google_map_canvas = $("#map-canvas");

  if (google_map_canvas.length) {
    google.maps.event.addDomListener(window, "load", initialize);
  }

  // Counter

  $(".counter-stat span").counterUp({
    delay: 10,
    time: 1000,
  });

  // Shuffle js filter and masonry
  var Shuffle = window.Shuffle;
  var jQuery = window.jQuery;

  var myShuffle = new Shuffle(document.querySelector(".shuffle-wrapper"), {
    itemSelector: ".shuffle-item",
    buffer: 1,
  });

  jQuery('input[name="shuffle-filter"]').on("change", function (evt) {
    var input = evt.currentTarget;
    if (input.checked) {
      myShuffle.filter(input.value);
    }
  });
})(jQuery);
