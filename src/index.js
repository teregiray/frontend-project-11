import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';

const state = {
  link: null,
  valid: {
    rules: null,
    duplicate: null,
  },
  feeds: [],
};

const form = document.querySelector("form"); // eslint-disable-line
const urlInput = form.querySelector("#url-input"); // eslint-disable-line
const feedback = document.querySelector(".feedback"); // eslint-disable-line

const render = () => {
  urlInput.value = '';
  urlInput.focus();

  if (state.valid.duplicate) {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = 'RSS уже существует';
  } else if (state.valid.rules) {
    urlInput.classList.remove('is-invalid');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS успешно загружен';
  } else {
    urlInput.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = 'Ссылка должна быть валидным URL';
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
