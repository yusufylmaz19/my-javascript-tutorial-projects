const slider = document.querySelector(".slider-container"),
  slides = Array.from(document.querySelectorAll(".slide"));

let isDragging = false,
  startPos = 0,
  currentTranslete = 0,
  prevTranslate = 0,
  animationId = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = document.querySelector("img");
  slideImage.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  //touch events

  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  //mouse events

  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
  slide.addEventListener("mousemove", touchMove);
});

//disable context menu
window.oncontextmenu = function (e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

function touchStart(index) {
  return function (event) {
    startPos = getPositionX(event);
    currentIndex = index;
    isDragging = true;
    animationId = requestAnimationFrame(animation);
    slider.classList.add("grabbing");
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationId);

  const moveBy = currentTranslete - prevTranslate;

  if (moveBy < -100 && currentIndex < slides.length - 1) {
    currentIndex++;
  }
  if (moveBy > 100 && currentIndex > 0) {
    currentIndex--;
  }

  setPositionByIndex();

  slider.classList.remove("grabbing");
}
function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslete = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  return (slider.style.transform = `translate(${currentTranslete}px)`);
}

function setPositionByIndex() {
  currentTranslete = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslete;
  setSliderPosition();
}
