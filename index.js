// set up simple lightbox gallery
const lightbox = new SimpleLightbox(".grid a", {
  captionsData: "alt",
  captionPosition: "bottom",
});

window.onload = () => {
  const elem = document.querySelector(".grid");
  const msnry = new Masonry(elem, {
    // options
    itemSelector: ".grid-item",
    gutter: 42,
    fitWidth: true,
  });
};

// modal section
const modalForm = document.getElementById("contact-modal");
const modalClose = document.getElementById("exampleModal");

const sendModalMessage = (e) => {
  e.preventDefault();
  //   get the form values
  const userMessage = document.getElementById("message");
  const userMail = document.getElementById("email-address");

  const message = userMessage.value;
  const mail = userMail.value;

  //   Send the user's email and message to the API for email delivery.

  //   Reset form inputs
  e.target.reset();
};

modalForm.addEventListener("submit", sendModalMessage);

// Project load more

const moreBtn = document.getElementById("loadMore");

const loadMorePhoto = () => {
  // get grid backdrop and remove backdrop
  const sectionBackdrop = document.getElementById("grid-backdrop");
  sectionBackdrop.classList.remove("grid-backdrop");

  // hide button
  moreBtn.classList.add("hide");

  // load more photo
};

moreBtn.addEventListener("click", loadMorePhoto);
