import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      item => `
      <li class="gallery-item">
        <a href="${item.largeImageURL}">
            <img class="gallery-image" src="${item.webformatURL}" alt="${item.tags}" />
        </a>

        <div class="info">
          <p>Likes<span>${item.likes}</span></p>
          <p>Views <span>${item.views}</span></p>
          <p>Comments <span>${item.comments}</span></p>
          <p>Downloads <span>${item.downloads}</span></p>
        </div>
      </li>
    `
    )
    .join('');

  list.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  list.innerHTML = '';
}
export function showLoader() {
  loader.style.display = 'block';
}
export function hideLoader() {
  loader.style.display = 'none';
}

export function showLoadMoreButton() {}
export function hideLoadMoreButton() {}
