export default class Slideshow {
  constructor() {
    this.slideIndex = 1;
  }

  // Next/previous controls
  plusSlides(n) {
    this.slideIndex += n;
    this.showSlides(this.slideIndex);
  }

  // Thumbnail image controls
  currentSlide(n) {
    this.slideIndex = n + 1;
    this.showSlides(this.slideIndex);
  }

  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    } 
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }
}
