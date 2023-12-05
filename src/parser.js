import fetchFunc from './fetch.js';

async function fetchData(link) {
  try {
    const data = await fetchFunc(link);
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error; // Пробрасываем ошибку для обработки в вызывающем коде
  }
}

function htmlToXml(html) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(html, 'text/html');
  const xmlSerializer = new XMLSerializer();
  return xmlSerializer.serializeToString(xmlDoc);
}

const htmlCode = '';

// Вызываем fetchData и передаем ссылку
fetchData('https://ru.hexlet.io/lessons.rss')
  .then((data) => {
    const xmlCode = htmlToXml(data);
    console.log(xmlCode);
  })
  .catch((error) => console.error(`Error in fetchData: ${error.message}`));
