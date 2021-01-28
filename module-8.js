import gallery from './gallery-items.js';

const galleryList = document.querySelector('.gallery');


const galleryMarkup = gallery.map(({ preview, original, description }) =>
    `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}">
    <img class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`).join('');


galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const linksArray = [...gallery.map(element => element.original)];

galleryList.addEventListener('click', galleryClick);

function galleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return
    };
    const largeImgUrl = event.target.dataset.source;

    lightbox.classList.add('is-open');
    lightboxImage.setAttribute('src', largeImgUrl);
};
 

lightbox.addEventListener('click', event => {
    if (event.target.nodeName === 'BUTTON') {
        closeLightbox();

    };

    if (event.target.className === 'lightbox__overlay') {
        closeLightbox();
    };
});

function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightboxImage.setAttribute('src', '');
    lightbox.removeEventListener('click', event);
    window.removeEventListener('keydown', event);

};


function changeImage(dir) {
    lightboxImage.src = linksArray[linksArray.indexOf(lightboxImage.src)
    + (dir || 1)] ||
    linksArray[dir ? linksArray.length - 1 : 0];
};

window.addEventListener('keydown', event => {
    
    if (event.key === 'Escape') {
        closeLightbox();
    };

    if (event.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (event.key === 'ArrowRight') {
        changeImage();
    }
});
