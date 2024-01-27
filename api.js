import axios from 'axios';
import moment from 'moment';

// Change these!
const apiKey = '4646f2ef-9ef5-45a3-8ce6-8357840b8559';
const tokenId = '4646f2ef-9ef5-45a3-8ce6-8357840b8559';

async function getData(apiKey, tokenId) {
  let date = moment.utc().subtract(2, 'hours').format('YYYY-MM-DD hh:mm:ss');  
  let dateQuery = `created_at:["${date}" TO "*"]`

  try {
    const response = await axios.get(`https://webhook.site/token/${tokenId}/requests`, {
    method: 'POST',
      params: {
        query: dateQuery,
      },
      headers: {
        'Api-Key': apiKey,
        'Accept': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const requests = await getData(apiKey, tokenId);

console.log(`${requests.total} requests found:`);

for (const request of requests.data) {
  console.log({
    method: request.method, 
    body: request.content,
    date: request.created_at,
  });
}
