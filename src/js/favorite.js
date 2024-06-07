import { getLocalStorage, loadHeaderFooter, showMessage } from "./utils.mjs";
import { displayBreeds } from "./breedList.mjs";

loadHeaderFooter();

if (localStorage.getItem("favorite") !== null) {
    displayBreeds(getLocalStorage("favorite"));
} else {
    showMessage("main", "There is nothing here yet");
    console.log("hello");
}
