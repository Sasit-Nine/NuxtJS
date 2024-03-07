// server/api/proxy.ts
export default defineEventHandler(async (event) => {
  try {
    const apiUrl = process.env.API_URL + '/product/all';

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    if (response.status === 401) {
      return 'Unauthorized';
    } else if (!response.ok) {
      return { error: response.statusText };
    }

    const data = await response.json();
    return data.message;

  } catch (error) {
    console.error('Error proxying API request:', error);
    return { error: 'Internal Server Error' };
  }
});
