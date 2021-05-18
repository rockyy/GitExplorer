import axios from 'axios';
import {API_URL} from '../config/url';

const queryApi = async (endPoint, method, body = null) => {
  const res = await makeRequest(
    endPoint,
    method,
    {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body,
  );

  console.log(`queryApi response ${JSON.stringify(res)}`);
  // if(res.status == 401){
  //     // Logout
  // }

  return res;
};

const makeRequest = async (endPoint, method, headers, body = null) => {
  let query = body
    ? '?' +
      Object.keys(body)
        .map(function (keyName, keyIndex) {
          return keyName + '=' + body[keyName];
        })
        .join('&')
    : '';

  let requestUrl = API_URL + endPoint + query;

  return axios({
    url: requestUrl,
    method: method,
    data: JSON.stringify({
      ...body,
    }),
    headers: headers,
  });
};

export {queryApi};
