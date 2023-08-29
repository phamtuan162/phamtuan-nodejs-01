var carousel = document.querySelector(".carousel");
var carouselInner = carousel.querySelector(".carousel-inner");
var carouselNav = carousel.querySelector(".carousel-nav");
var navNext = carouselNav.querySelector(".next");
var navPrev = carouselNav.querySelector(".prev");
var carouselDots = carousel.querySelector(".carousel-dots");
var carouselItems = carouselInner.querySelectorAll(".item");

if (carouselItems.length) {
  var itemWidth = carouselInner.clientWidth;
  var totalWidth = itemWidth * carouselItems.length;
  carouselInner.style.width = `${totalWidth}px`;

  carouselItems.forEach(function (item, index) {
    item.style.width = `${itemWidth}px`;
    var dotsHTML = `<span class="dot-item ${
      index === 0 ? "active" : ""
    }" data-index="${index}"></span>`;
    carouselDots.innerHTML += dotsHTML;
  });

  var slideTo = function (index) {
    currentIndex = index;
    position = -1 * itemWidth * currentIndex;
    carouselInner.style.translate = `${position}px`;
    setActiveDot(currentIndex);
  };

  var dotItems = carouselDots.querySelectorAll(".dot-item");
  var setActiveDot = function (index) {
    dotItems.forEach(function (item, dotIndex) {
      item.classList.remove("active");
      if (index === dotIndex) {
        item.classList.add("active");
      }

      item.addEventListener("click", function () {
        slideTo(dotIndex);
      });
    });
  };

  setActiveDot(0);
  var position = 0;
  var currentIndex = 0;
  navNext.addEventListener("click", function () {
    if (Math.abs(position) < totalWidth - itemWidth) {
      position -= itemWidth;
      carouselInner.style.translate = `${position}px`;
      currentIndex++;
      setActiveDot(currentIndex);
    }
  });

  navPrev.addEventListener("click", function () {
    if (position < 0) {
      position += itemWidth;
      carouselInner.style.translate = `${position}px`;
      currentIndex--;
      setActiveDot(currentIndex);
    }
  });

  var isDrag = false;
  var isTransition = false;
  var dragStartX;
  var dragThreshold = itemWidth * 0.2;
  carouselInner.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isDrag = true;
    dragStartX = e.clientX;
  });
  carouselInner.addEventListener("mouseup", function (e) {
    e.preventDefault();
    isDrag = false;
    carouselInner.style.translate = `${position}px`;
    setActiveDot(currentIndex);
    isTransition = false;
  });

  carouselInner.addEventListener("mousemove", function (e) {
    e.preventDefault();
    if (isDrag) {
      carouselInner.style.cursor = "move";
      var dragOffset = e.clientX - dragStartX;
      if (Math.abs(dragOffset) < dragThreshold) {
        carouselInner.style.translate = `${position + dragOffset}px`;
      } else {
        if (!isTransition) {
          if (dragOffset < 0 && Math.abs(position) < totalWidth - itemWidth) {
            position -= itemWidth;
            isTransition = true;
            currentIndex++;
          } else if (dragOffset > 0 && position < 0) {
            position += itemWidth;
            isTransition = true;
            currentIndex--;
          }
          slideTo(currentIndex);
        }
      }
    } else {
      carouselInner.style.cursor = "default";
    }
  });
}
