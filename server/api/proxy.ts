// server/api/proxy.ts
export default defineEventHandler(async (event) => {
  try {
    const apiUrl = process.env.API_URL + '/product/all';
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcwOTYyNDA1MSwiZXhwIjozMzI0NTYyNDA1MX0.01BroMNk9JXcaluf4IJ1HuZeCfDGAmxB5lgjhTFUOqE'

    const response = await fetch('http://wallserver.dyndns.info:10000/product/all', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
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
