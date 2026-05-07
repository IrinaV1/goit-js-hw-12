import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.btn-loader');

let page = 1;
let query = '';

form.addEventListener('submit', handleFormClick);
loadMoreBtn.addEventListener('click', handleLoadBtn);

async function handleFormClick(event) {
  event.preventDefault();

  clearGallery();
  hideLoadMoreButton();

  query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  page = 1;
  showLoader();

  try {
    const response = await getImagesByQuery(query, page);
    const data = response.hits;
    const totalHits = response.totalHits;
    if (!data.length) {
      iziToast.show({
        titleColor: 'white',
        position: 'topRight',
        title: 'Error',
        backgroundColor: 'red',
        messageColor: 'white',
        message: 'No images found for this query. Please try again.',
      });
      return;
    }
    createGallery(data);

    const totalPages = Math.ceil(totalHits / 15);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();

      iziToast.show({
        titleColor: 'white',
        position: 'topRight',
        title: 'Error',
        backgroundColor: 'red',
        messageColor: 'white',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
  } catch (error) {
    iziToast.show({
      titleColor: 'white',
      position: 'topRight',
      title: 'Error',
      backgroundColor: 'red',
      messageColor: 'white',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
    event.target.reset();
  }
}

async function handleLoadBtn() {
  page++;
  loadMoreBtn.disabled = true;
  showLoader();
  hideLoadMoreButton();
  try {
    const response = await getImagesByQuery(query, page);
    const data = response.hits;
    const totalHits = response.totalHits;
    createGallery(data);

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(totalHits / 15);
    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
      backgroundColor: 'red',
      messageColor: 'white',
    });
  } finally {
    loadMoreBtn.disabled = false;
    hideLoader();
  }
}
