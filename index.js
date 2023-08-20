// gallery
const moreBtn = document.getElementById("loadMore");
const galleryBackdrop = document.getElementById("project-gallery");
const gallery = document.getElementById("grid-backdrop");
// modal
const modalForm = document.getElementById("contact-modal");
const modalClose = document.getElementById("exampleModal");
// search bar
const searchQuery = document.getElementById("searchInput");
const searchIcon = document.getElementById("search-icon");
const searchableElements = document.querySelectorAll(`[data-search="true"]`);

// set up simple lightbox gallery

let lightbox = new SimpleLightbox(".grid a", {
  captionsData: "alt",
  captionPosition: "bottom",
});

// masonry initialization
const masonryLoadPhotos = () => {
  imagesLoaded(gallery, function (instance) {
    const elem = document.querySelector(".grid");
    const msnry = new Masonry(elem, {
      itemSelector: ".grid-item",
      gutter: 30,
      fitWidth: true,
    });
  });
};

masonryLoadPhotos();

// nav search handler
let windowHideInputEvent;

const hideInput = (e) => {
  if (e.target.id === "search-icon" || e.target.id === "searchInput") {
    return;
  }
  searchQuery.classList.toggle("search-bar-clicked");
  searchQuery.classList.toggle("search-bar");
  removeEventListener("click", windowHideInputEvent);
};

const handleIconClick = () => {
  windowHideInputEvent = hideInput;
  window.addEventListener("click", windowHideInputEvent);

  searchQuery.classList.toggle("search-bar-clicked");
  searchQuery.classList.toggle("search-bar");
};

const handleSearchInput = () => {
  // change both user query and html element's text to lower case
  const inputText = searchQuery.value.toLowerCase();
  let isOnPage = null;

  // iterate table to find text that match user query
  searchableElements.forEach((elem) => {
    const text = elem.textContent.toLowerCase();
    // if element includes query change isOnPage to that element
    if (text.includes(inputText)) {
      isOnPage = elem;
    }
  });
  // scroll to found element
  if (isOnPage) {
    isOnPage.scrollIntoView();
  }
  // if query isn't found, send notification
  if (!isOnPage) {
    Notiflix.Notify.failure(
      "Nie znaleźliśmy szukanego tekstu. Spróbuj ponownie, lub skontaktuj się z nami."
    );
  }
};

// modal section

const contactMsgs = {
  success: "Twoja wiadomość została wysłana",
  promo:
    "Dziękujemy za przesłanie wiadomości. Na twój adres mailowy przesłaliśmy promocyjny kod.",
  failure: "Coś poszło nie tak. Spróbuj ponownie później, bądź zadzwoń do nas.",
};

const sendModalMessage = (e) => {
  e.preventDefault();
  // get the messages from object
  const { success, promo, failure } = contactMsgs;
  //   get the form values
  const userMessage = document.getElementById("message");
  const userMail = document.getElementById("email-address");
  const promoCheckBox = document.getElementById("promoCheckBox").checked;
  const modalBody = document.querySelector(".modal-body");
  const message = userMessage.value;
  const mail = userMail.value;

  //   Send the user's email and message to the API for email delivery.
  let msgSend = true;

  // Send confirmation
  if (msgSend && promoCheckBox) {
    Notiflix.Notify.success(promo);
  }
  if (msgSend && !promoCheckBox) {
    Notiflix.Notify.success(success);
  }
  if (!msgSend) {
    Notiflix.Notify.failure(failure);
  }
  //   Reset form inputs
  e.target.reset();
};

const betterImageObjects = [
  {
    src: "utils/load_more/grill_garden.jpg",
    alt: "Ogród z grilem.",
  },
  {
    src: "utils/load_more/privacy.jpg",
    alt: "Zakątek prywatności",
  },
  {
    src: "utils/load_more/better_city.jpg",
    alt: "Wielkomiejskie przestrzenie",
  },
  {
    src: "utils/load_more/modern_garden_2.jpg",
    alt: "Zagospodarowanie każdego centymetra",
  },
  {
    src: "utils/load_more/modern_garden.jpg",
    alt: "Mała przytulna przestrzeń",
  },
  {
    src: "utils/load_more/outside_the_city.jpg",
    alt: "Poza miastem",
  },
  {
    src: "utils/load_more/party_garden.jpg",
    alt: "Przestrzeń do spędzania czasu z przyjaciółmi",
  },
  {
    src: "utils/load_more/stair_garden.png",
    alt: "Przestrzeń do spędzania czasu z przyjaciółmi",
  },
];

// when moreBtn is clicked, add more photos

const createHtmlPhotos = () => {
  const HTMLCode = betterImageObjects
    .map((photoObject) => {
      const { src, alt } = photoObject;

      return `
      <div class="grid-item">
        <a href="${src}">
          <img class="gallery-item" src="${src}" alt="${alt}">
        </a>
       </div>`;
    })
    .join("");
  return HTMLCode;
};

const loadMorePhoto = () => {
  // get grid backdrop and remove backdrop
  galleryBackdrop.classList.remove("project-gallery");

  moreBtn.classList.add("d-none");
  let morePhotos = createHtmlPhotos();

  // add photos to DOM
  gallery.innerHTML = gallery.innerHTML + morePhotos;

  // trigger masonry and simpleLightbox to refresh
  masonryLoadPhotos();
  lightbox.refresh();
};

// Section appear observer
const observeElements = document.querySelectorAll(".observe");
observeElements.forEach((elem) => elem.classList.add("observer-transition"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const pageElement = entry.target;
    if (entry.isIntersecting) {
      pageElement.classList.add("observer-transition");
    } else {
      pageElement.classList.remove("observer-transition");
    }
  });
});

// observeElements.forEach((element) => observer.observe(element));

modalForm.addEventListener("submit", sendModalMessage);
moreBtn.addEventListener("click", loadMorePhoto);
searchQuery.addEventListener("change", handleSearchInput);
searchIcon.addEventListener("click", handleIconClick);
