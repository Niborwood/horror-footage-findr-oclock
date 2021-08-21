import axios from 'axios';
// on peut pré-configurer une instance d'axios
// ici on passe le baseUrl, ainsi quand on utilisera "api"
// on aura pas besoin de préciser cette valeur de baseUrl
const api = axios.create({
  baseURL: 'https://horror-footage-api.herokuapp.com/',
});

export const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export default api;
