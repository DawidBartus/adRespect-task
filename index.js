// gallery
const moreBtn = document.getElementById("loadMore");
const galleryBackdrop = document.getElementById("project-gallery");
const gallery = document.getElementById("grid-backdrop");
// modal
const modalForm = document.getElementById("contact-modal");
const modalClose = document.getElementById("exampleModal");
// search bar
const searchQuery = document.getElementById("searchInput");
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

// Project load more
const betterImageObjects = [
  {
    src: "https://pixabay.com/get/g58f086547e7f6ed19f26b549cf12045f232413b0a109ed569af7587f38826527e528df463ce966127f2e6b8c7ad01cbb083eb06f57eeb98f9c6485d91d0f207b_640.jpg",
    big: "https://pixabay.com/get/g8bf3c1e4ecd01e16f38af7e6488a6b81449801a9fe999e7767daa7349889af7e6361f22830106400a822641a445b9b22e9f21a79ebc77438e47eb3b22b8101e7_1280.jpg",
    alt: "Ogród z grilem.",
  },

  {
    src: "https://pixabay.com/get/gf1afec714de92dd8debe5fb26c2edbbbe1fa1e1446cda7531c08ac835debbeffbbca5a836408b6611b484deb2a4a9275_640.jpg",
    big: "https://pixabay.com/get/gb45db13454bfe05ec62369fb8e117df3da8e28585ff01e2ed06b1e59a8566d5ac57ce4b4e22880be15476c045a2eccaa13e2c678eecb7e7615c9d5ab80583d49_1280.jpg",
    alt: "Zakątek prywatności",
  },
  {
    src: "https://pixabay.com/get/g2de496d897e5017ed5b04b405921c4ce8eb888cf5319ef8f87a51ac521f33a9559f726ee3738a1e6cb852c3709732ea72676fd7238c204aaeefd5bd330d7b2bc_640.jpg",
    big: "https://pixabay.com/get/g298cce1ca43585301594101b4a0ece34ba5a5954448c39deddd7a778022e0b81e5bba9c7b43e46ca461071210c76279a3d9fb88a16a85678e368cc76d2da4d81_1280.jpg",
    alt: "Wielkomiejskie przestrzenie",
  },

  {
    src: "https://pixabay.com/get/gfdd10db82d3869f589ed1d5009fec2fb2ba0004716c0805f966b851849716304444006170d81b9e09846cf0b779b5b143b6777eca2d648e8a811427de0b36341_640.jpg",
    big: "https://pixabay.com/get/gd5ca834d672ddadd721a4595d23bd93f55b15bf1efdc3492aed38e05c397bad4c1820bf07e1f16ead1a9e0bed149350add49c38bd9833eef442510474cf64a6f_1280.jpg",
    alt: "Mała przytulna przestrzeń",
  },
  {
    src: "https://pixabay.com/get/g7b4e6e64f73880b63e71a80882f55f157f2458697bb7ed77f8b03f4d75663451c72668841693bd8179942818f4b6c2c02961c114a5a162a12a9d78de75b63a58_640.jpg",
    big: "https://pixabay.com/get/gec63d361b96c7ce71aee2eee315e1f75578202a1259cc867079a4d3da9c5c447d554e1ff703a78016a32a333867dec8d581948bfa0db984fa6ce7fedb6df3951_1280.jpg",
    alt: "Zagospodarowanie każdego centymetra",
  },
  {
    src: "https://pixabay.com/get/g6c66022a2d1f07e52309359ecdfa33fb19509df668d5ad9917e03de5bf385e1f4d2e291dc227e019caf8387b88aae1d34ed67d5c5bde6274e2d5b192c0cd4e83_640.jpg",
    big: "https://pixabay.com/get/gce62e41142f6bae3f1d9f43d9e14e554ae990ac927e623e3579802889108057d5ab928b2b2df92a1715ec7d8e437a750d60f714d483e6ff482901e785553647c_1280.jpg",
    alt: "Ogród z tarasem",
  },
  {
    src: "https://pixabay.com/get/ge6800728280a57346780c751cf24c433ee01e020230b10642e4e7b4b6fa1aac82e4f7118f6a173cc64d6da19ab8051525e4a6f2b2ed40147c36ac5517e73c8a5_640.jpg",
    big: "https://pixabay.com/get/gb3575d6214eeb0bd26e2de32cab253ddfbc8e0171c2a1f97a19d45822b01023b8f7190ea69b0ae33526ef8140163e307c597cb6014c58464ef6ffa9b31908a27_1280.jpg",
    alt: "Przestrzeń do spędzania czasu z przyjaciółmi",
  },
];

// when moreBtn is clicked, add more photos

const createHtmlPhotos = () => {
  const HTMLCode = betterImageObjects
    .map((photoObject) => {
      const { src, big, alt } = photoObject;

      return `
      <div class="grid-item">
        <a href="${big}">
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

  // hide button
  moreBtn.classList.add("d-none");

  // load more photo
  let morePhotos = createHtmlPhotos();

  // add photos to DOM
  gallery.innerHTML = gallery.innerHTML + morePhotos;

  // trigger masonry and simpleLightbox to refresh
  masonryLoadPhotos();
  lightbox.refresh();
};

modalForm.addEventListener("submit", sendModalMessage);
moreBtn.addEventListener("click", loadMorePhoto);
searchQuery.addEventListener("change", handleSearchInput);
