import axios from 'axios';

const jwtToken = sessionStorage.getItem('jwttoken');
export default axios.create({
  baseURL: "http://localhost/api/v1",
  headers: {
    "Content-type": "application/json",
    "Authorization": (jwtToken) ?  'Bearer ' + jwtToken : ''
  }
});