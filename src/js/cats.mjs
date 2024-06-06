import { assignEvents, showSlides } from "./slideshow.mjs";

// creates cat slideshow
export const getCatSlideshow = async (n) => {
  const catURL = `https://api.thecatapi.com/v1/images/search?limit=${n}&mime_types=jpg&api_key=${process.env.API_KEY}`;
  const response = await fetch(catURL);
  if (response.ok) {
    let data = await response.json();
    displaySlideshow(data);
    assignEvents();
  }
};

// creates cat board
export const getCatExplore = async (n) => {
  const catURL = `https://api.thecatapi.com/v1/images/search?limit=${n}&mime_types=jpg&api_key=${process.env.API_KEY}`;
  const response = await fetch(catURL);
  if (response.ok) {
    let data = await response.json();
    displayExplore(data);
  }
};

// displays array of cat images as a slideshow
export const displaySlideshow = (cats) => {
  let slideIndex = localStorage.getItem("slideIndex");

  const catsContainer = document.querySelector(".slideshow-container");

  let dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dotrow");

  let prevArrow = document.createElement("a");
  prevArrow.classList.add("prev");
  prevArrow.innerHTML = "<";
  dotsContainer.appendChild(prevArrow);

  cats.forEach((cat) => {
    let sectionItem = document.createElement("section");
    sectionItem.classList.add("mySlides");
    sectionItem.classList.add("fade");

    let img = document.createElement("img");
    img.classList.add("cardimg");
    img.src = cat.url;
    img.alt = `Picture of a cat`;
    img.loading = "lazy";

    let dot = document.createElement("span");
    dot.classList.add("dot");

    sectionItem.appendChild(img);
    dotsContainer.appendChild(dot);

    catsContainer.appendChild(sectionItem);
  });

  let nextArrow = document.createElement("a");
  nextArrow.classList.add("next");
  nextArrow.innerHTML = ">";
  dotsContainer.appendChild(nextArrow);

  catsContainer.appendChild(dotsContainer);

  showSlides(slideIndex);
  assignEvents();
};

// displays a mansory of cat images
export const displayExplore = (cats) => {
  const catsContainer = document.querySelector("#masonry-container");

  cats.forEach((cat) => {
    let sectionItem = document.createElement("section");
    sectionItem.classList.add("masonry-item");

    let img = document.createElement("img");
    img.classList.add("card-exploreimg");
    img.src = cat.url;
    img.alt = `Picture of a cat`;
    img.loading = "lazy";

    sectionItem.appendChild(img);
    catsContainer.appendChild(sectionItem);
  });
};
