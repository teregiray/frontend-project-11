import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import i18n from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';

const app = async () => {
  const i18nextInstance = i18n.createInstance();

  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const state = {
    link: null,
    valid: {
      rules: null,
      duplicate: null,
    },
    feeds: [],
    lng: 'ru',
  };

  const form = document.querySelector("form"); // eslint-disable-line
  const urlInput = form.querySelector("#url-input"); // eslint-disable-line
  const feedback = document.querySelector(".feedback"); // eslint-disable-line
  const sectionText = document.querySelector(".container-xxl"); // eslint-disable-line
  // sectionText.textContent = '';

  const getDOMobjFromURL = (url) => axios
  .get(
    `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(
      url,
    )}`,
  )
  .then((response) => {
    if (response.status === 200) return response.data;
    throw new Error();
  })
  .then((data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'application/xml');
    console.log(doc);
    console.log(data);
    if (errorNode) throw Error('invallidRSS');
    return doc;
  })
  .catch((error) => {
    if (error.message === 'invallidRSS') {
      state.feedback.feedbackText = i18nInstance.t('invallidRSS');
    } else {
      state.feedback.feedbackText = i18nInstance.t('networkError');
    }
  });

  const isValid = async (translateKey) => {
    urlInput.classList.remove('is-invalid');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = i18nextInstance.t(translateKey);
    console.log(await getDOMobjFromURL(state.link));
  };

  const inValid = (translateKey) => {
    urlInput.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = i18nextInstance.t(translateKey);
  };

  

  const render = () => {
    urlInput.value = '';
    urlInput.focus();

    if (state.valid.duplicate) {
      inValid('rssAlreadyExists');
    } else if (state.valid.rules) {
      isValid('rssAdded');
    } else {
      inValid('notValidRss');
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputLink = urlInput.value;
    state.link = inputLink;

    // дубли
    if (state.feeds.includes(inputLink)) {
      state.valid.duplicate = true;
      render();
      return;
    }

    // валидация
    const schema = yup.object().shape({
      link: yup.string().url().required(),
    });

    try {
      await schema.validate(state);
      state.valid.rules = true;
      state.feeds.push(inputLink);
    } catch (err) {
      // console.log(`error: ${err.errors}`);
      state.valid.rules = false;
    }

    render();
    console.log(state);
  });

  urlInput.focus();
};

export default app;
