import { getLocalStorage, setLocalStorage, percentage } from "./utils.mjs";
import { getBreed } from "./breedList.mjs";

function breedDetailsTemplate(breed) {
  return `<h3>${breed.name}</h3>
    <p class="breed-origin">Origin: ${breed.origin}</p>
    <p class="breed-description">${breed.description}</p>
    <div class="divider"></div>
    <p>Energy</p>
    <div class="stat-container">
      <div class="skills green">${breed.energy_level}</div>
    </div>

    <p>Intelligence</p>
    <div class="stat-container">
      <div class="skills blue">${breed.intelligence}</div>
    </div>

    <p>Affection</p>
    <div class="stat-container">
      <div class="skills red">${breed.affection_level}</div>
    </div>

    <p>Lifespan</p>
    <div class="stat-container">
      <div class="skills gray">${breed.health_issues}</div>
    </div>
    
    <div class="breed-add">
      <button id="addToFavorites" class="simple-button add" data-id="${breed.Id}">Favorites</button>
    </div>`;
} 

export default class BreedDetails {
  constructor(breedId) {
    this.breedId = breedId;
    this.breed = {};
  }
  async init() {
    let data = await getBreed(this.breedId);
    this.breed = data[0].breeds[0];
    this.renderbreedDetails(".card");
    this.renderStats();
    document
      .getElementById("addToFavorites")
      .addEventListener("click", this.addToCart.bind(this));

      let button = document.getElementById("addToFavorites");
      button.addEventListener("click",() => this.toggleState(button));
      this.checkState(button);  
  }
  addToCart() {
    setLocalStorage("favorite", this.breed);
  }
  renderbreedDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("afterBegin", breedDetailsTemplate(this.breed))
  }
  renderStats() {
    let skills = document.getElementsByClassName("skills");
    for (const skill of skills) {
      let stat = Number(skill.innerHTML);
      skill.style.width = `${(percentage(stat, 5))}%`;
    }
  }
  toggleState(element) {
    element.classList.toggle("add");
    element.classList.toggle("remove");
  }
  checkState(element) {
    let list = getLocalStorage("favorite");
    if (list.some(e => e.id === this.breedId)) {
      this.toggleState(element);
    }
  }
}

