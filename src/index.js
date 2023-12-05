import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';

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

const isValid = (translateKey) => {
  urlInput.classList.remove('is-invalid');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
  feedback.textContent = i18nextInstance.t(translateKey);
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
