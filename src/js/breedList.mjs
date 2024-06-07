import { displaySlideshow } from "./cats.mjs";

// get cat image of a certain breed
export const getBreed = async (breed, n = 1, slideshow = false) => {
  const catURL = `https://api.thecatapi.com/v1/images/search?limit=${n}&breed_ids=${breed}&mime_types=jpg&api_key=${process.env.API_KEY}`;
  const response = await fetch(catURL);
  if (response.ok) {
    let data = await response.json();
    if (slideshow){
      displaySlideshow(data);
    } else {
      return data;
    }
  }
};

export const getBreedList = async (n, page) => {
  const catURL = `https://api.thecatapi.com/v1/breeds?limit=${n}&page=${page}&mime_types=jpg&api_key=${process.env.API_KEY}`;
  const response = await fetch(catURL);
  if (response.ok) {
    let data = await response.json();
    displayBreeds(data);
  }
};

// gets breed catalogue
export const displayBreeds = (breeds) => {
  const breedsContainer = document.querySelector(".catalogue-container");
  breeds.forEach(async (breed) => {
    const breedrequest = await getBreed(breed.id);
    for (const obj of breedrequest) {
    
    let sectionItem = document.createElement("section");
    sectionItem.classList.add("breed-card");
    
    let link = document.createElement("a");
    link.href = `../breed/index.html?breed=${breed.id}`;

    let fig = document.createElement("figure")

    let img = document.createElement("img");
    img.classList.add("cardimg"); 
    img.src = obj.url;
    img.alt = `Picture of a ${breed.name}`;
    img.loading = "lazy";

    let figcap = document.createElement("figcaption");
    figcap.innerHTML = `${breed.name}`;

    fig.appendChild(img);
    fig.appendChild(figcap);
    link.appendChild(fig);
    sectionItem.appendChild(link);

    breedsContainer.appendChild(sectionItem);
    }
  });
};

export function assignPagination(param) {
  let buttons = document.getElementsByClassName("pagebutton");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].href = `../catalogue/index.html?page=${i}`;
    if (i === Number(param)) {
      buttons[i].classList.add("current");
    }
  }
}
 