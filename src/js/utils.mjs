// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  let empty = [];
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return empty;
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  const favList = getLocalStorage(key);
  let arr = [];
  if (favList === undefined || favList.length === 0) {
    arr.push(data);
  } else {
    arr = toggle(favList, data, (item) => item.id);
  }
  localStorage.setItem(key, JSON.stringify(arr));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const renderedList = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, renderedList.join(""));
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export const loadTemplate = async (path) => {
  const res = await fetch(path);
  const template = await res.text();
  return template;
};

export const loadHeaderFooter = async () => {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#navbar");
  const footerElement = document.querySelector("#main-footer");

  // Check to see if the header/footer elements exist. If so, it clears and loads them,.
  if (headerElement) {
    headerElement.innerHTML = "";
    renderWithTemplate(headerTemplate, headerElement);
    loadMenu();
  }

  if (footerElement) {
    footerElement.innerHTML = "";
    renderWithTemplate(footerTemplate, footerElement);
    loadFooterInfo();
  }
};

// Hamburguer menu button
export function loadMenu() {
  const navbar = document.getElementById("navbar");
  const navbarToggle = navbar.querySelector(".navbar-toggle");

  function openMobileNavbar() {
    navbar.classList.add("opened");
    navbarToggle.setAttribute("aria-expanded", "true");
  }

  function closeMobileNavbar() {
    navbar.classList.remove("opened");
    navbarToggle.setAttribute("aria-expanded", "false");
  }

  navbarToggle.addEventListener("click", () => {
    if (navbar.classList.contains("opened")) {
      closeMobileNavbar();
    } else {
      openMobileNavbar();
    }
  });

  const navbarMenu = navbar.querySelector("#navbar-menu");
  const navbarLinksContainer = navbar.querySelector(".navbar-links");

  navbarLinksContainer.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
  });

  navbarMenu.addEventListener("click", closeMobileNavbar);
}

export function loadFooterInfo() {
  // Get Elements
  const ParagraphElement = document.querySelector("#copyrightYear");

  let currentYear = new Date().getFullYear();
  ParagraphElement.innerHTML = `©${currentYear} Cat Library`;
}

export function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

const toggle = (arr, item, getValue = (item) => item) => {
  if (arr.some((i) => getValue(i) === getValue(item)))
    return arr.filter((i) => getValue(i) !== getValue(item));
  else return [...arr, item];
};

export function showMessage(container, message) {
  const element = document.querySelector(container);
  let para = document.createElement("p");
  para.innerHTML = message;
  para.classList.add("message");
  element.insertBefore(para, element.childNodes[2]);
}