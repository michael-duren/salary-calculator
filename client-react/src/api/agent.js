import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5145/api';

// used to mock a loading time from server
const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(2000);
    return response;
  } catch (e) {
    console.log(e);
    return await Promise.reject(e);
  }
});

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Employees = {
  list: () => requests.get('/employees'),
  single: (id) => requests.get(`/amployees/${id}`),
  create: (employee) => requests.post('/employees', employee),
  update: (employee) => requests.put(`/employees/${employee.id}`, employee),
  delete: (id) => requests.del(`/employees/${id}`),
};

const agent = {
  Employees,
};

export default agent;
