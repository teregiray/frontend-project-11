import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';

const state = {
  link: null,
  valid: false,
};

const form = document.querySelector('form'); //eslint-disable-line

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputLink = form.querySelector('#url-input').value;
  state.link = inputLink;

  const schema = yup.object().shape({
    link: yup.string().required(),
  });

  try {
    await schema.validate(state);
    console.log(`success: ${state.link}`); // remove aft
    state.valid = true;
  } catch (err) {
    console.log(`error: ${err.errors}`); // remove aft
    state.valid = false;
  }

  console.log(state.valid); // remove aft
});
