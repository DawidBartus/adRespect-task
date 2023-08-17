// Gallery
const moreBtn = document.getElementById("loadMore");
const galleryBackdrop = document.getElementById("backdrop");
const gallery = document.getElementById("grid-backdrop");
// Modal
const modalForm = document.getElementById("contact-modal");
const modalClose = document.getElementById("exampleModal");

// set up simple lightbox gallery

let lightbox = new SimpleLightbox(".grid a", {
  captionsData: "alt",
  captionPosition: "bottom",
});

// Masonry initialization
const masonryLoadPhotos = () => {
  imagesLoaded(gallery, function (instance) {
    const elem = document.querySelector(".grid");
    const msnry = new Masonry(elem, {
      itemSelector: ".grid-item",
      gutter: 42,
      fitWidth: true,
    });
  });
};

masonryLoadPhotos();

// modal section

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

const imageObjects = [
  {
    src: "utils/jungle_stairs.png",
    big: "utils/bigger_images/jungle_stairs_xxl.png",
    alt: "Jungle Stairs",
  },
  {
    src: "utils/pool_garden.png",
    big: "utils/bigger_images/pool_garden_xxl.png",
    alt: "Pool Garden",
  },
  {
    src: "utils/rose_path.png",
    big: "utils/bigger_images/rose_path_xxl.png",
    alt: "Rose Path",
  },
  {
    src: "utils/mosaic_gazebo.png",
    big: "utils/bigger_images/mosaic_gazebo_xxl.png",
    alt: "Mosaic Gazebo",
  },
  {
    src: "utils/garden_path.png",
    big: "utils/bigger_images/garden_path_xxl.png",
    alt: "Garden Path",
  },
  {
    src: "utils/fish.png",
    big: "utils/bigger_images/fish_xxl.png",
    alt: "Fish",
  },
  {
    src: "utils/big_gazebo.png",
    big: "utils/bigger_images/big_gazebo_xxl.png",
    alt: "Big Gazebo",
  },
  {
    src: "utils/stairs.png",
    big: "utils/bigger_images/stairs_xxl.png",
    alt: "Stairs",
  },
  {
    src: "utils/garden_gazebo.png",
    big: "utils/bigger_images/garden_gazebo_xxl.png",
    alt: "Garden Gazebo",
  },
];

// when moreBtn is clicked, add more photos
// i would fetch more photos from DB but for this project it's easier to do it that way

const createHtmlPhotos = () => {
  let HTMLCode = imageObjects
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

  gallery.classList.remove("grid-backdrop");

  // hide button
  moreBtn.classList.add("hide");

  // load more photo
  let morePhotos = createHtmlPhotos();
  // add photos to DOM
  gallery.innerHTML = gallery.innerHTML + morePhotos;
  // trigger masonry and simpleLight to refresh
  masonryLoadPhotos();
  lightbox.refresh();
  console.log(lightbox);
};

moreBtn.addEventListener("click", loadMorePhoto);
