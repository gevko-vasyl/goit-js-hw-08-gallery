import gallery from './gallery-items.js';

const galleryList = document.querySelector('.gallery');


gallery.forEach(element => {
    const listElement = document.createElement('li');
    galleryList.appendChild(listElement);

    const galleryLink = document.createElement('a');
    listElement.appendChild(galleryLink);

    const galleryImg = document.createElement('img');
    galleryLink.appendChild(galleryImg);

    listElement.classList.add('gallery__item');

    galleryLink.classList.add('gallery__link');
    galleryLink.setAttribute('href', element.original);

    galleryImg.classList.add('gallery__image');
    galleryImg.setAttribute('src', element.preview);
    galleryImg.setAttribute('data-source', element.original);
    galleryImg.setAttribute('alt', element.description);
});

const galleryImg = document.querySelector('.gallery__image');
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
