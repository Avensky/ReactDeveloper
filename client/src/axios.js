import axios from 'axios';
//creating axios instance
const instance = axios.create({
    baseURL: 'https://myblog-97a03.firebaseio.com'
});

//instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';


export default instance;