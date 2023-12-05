import axios from 'axios';

async function fetchHTML(link) {
  try {
    const response = await axios.get(link);

    // Проверка успешности запроса
    if (response.status !== 200) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }

    const html = response.data;
    console.log(html);
  } catch (error) {
    console.error(`Axios error: ${error.message}`);
  }
}

export default fetchHTML;

fetchHTML('https://ru.hexlet.io/lessons.rss');
