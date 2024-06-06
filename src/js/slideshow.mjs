// Set local storage
let slideIndex = Number(localStorage.getItem("slideIndex") || 1);
if (slideIndex === null) {
  slideIx = 1;
}

// Next/previous controls
export function plusSlides(n) {
  showSlides(slideIndex += n);
  localStorage.setItem('slideIndex', slideIndex);
}

// Thumbnail image controls
export function currentSlide(n) {
  showSlides(slideIndex = n);
  localStorage.setItem('slideIndex', slideIndex);
}
  
export function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
      slideIndex = 1;
  }
  if (n < 1) {
      slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

export function assignEvents() {
  let preArrows = document.getElementsByClassName(".prev");
  for (const prevArrow of preArrows) {
    prevArrow.addEventListener("click", plusSlides(-1));
  }

  let nextArrows = document.getElementsByClassName(".next");
  for (const nextArrow of nextArrows) {
    nextArrow.addEventListener("click", plusSlides(1));
  }

  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", currentSlide(i));
  }
}
