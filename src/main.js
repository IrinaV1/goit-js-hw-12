import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', handleFormClick);

function handleFormClick(event) {
  event.preventDefault();
  clearGallery();

  const query = event.target.elements['search-text'].value.trim();
  if (!query) return;
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (!data.length) {
        iziToast.show({
          titleColor: 'white',
          position: 'topRight',
          title: 'Error',
          backgroundColor: 'red',
          messageColor: 'white',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      createGallery(data);
    })
    .catch(() => {
      iziToast.show({
        titleColor: 'white',
        position: 'topRight',
        title: 'Error',
        backgroundColor: 'red',
        messageColor: 'white',
        message: 'Something went wrong. Please try again later.',
      });
    })
    .finally(() => {
      event.target.reset();
      hideLoader();
    });
}
