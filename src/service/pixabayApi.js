const KEY = '24213343-241a268dec8bb0c33cac9d25a';
const BASE_URL = 'https://pixabay.com/api/';

export default async function pixabayApi(query, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
    );

    const parsedResponse = await response.json();

    if (!response.ok)
      throw Error('Oooops, anything did not work. Try again :)');

    if (!parsedResponse.totalHits)
      throw Error(
        `Oooops, we could not find "${query}". Write something another.`,
      );

    return parsedResponse;
  } catch (error) {
    return error.message;
  }
}
