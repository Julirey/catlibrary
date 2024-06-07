import { getParam } from "./utils.mjs";
import { getBreed } from "./breedList.mjs";
import BreedDetails from "./breedDetails.mjs";

const breedid = getParam("breed");
const details = new BreedDetails(breedid)

getBreed(breedid, 10, true);
details.init();
