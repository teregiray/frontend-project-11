async function fetchFunc(link) {
  // link = 'https://ru.hexlet.io/lessons.rss';
  try {
    const response = await fetch(link);

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }

    const text = await response.text();
    console.log(text);
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
  }
}

fetchFunc('https://ru.hexlet.io/lessons.rss');
