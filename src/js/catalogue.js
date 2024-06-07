import { getParam } from "./utils.mjs";
import { assignPagination, getBreedList } from "./breedList.mjs";

const page = getParam("page")

getBreedList(10, page);
assignPagination(page);