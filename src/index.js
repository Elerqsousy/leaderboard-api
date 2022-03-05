import './animation.css';
import './style.css';
import animation from './modules/animation.js';
import postToAPI from './modules/post-score.js';
import getFromAPI from './modules/get-scores.js';

const addForm = document.querySelector('.form');
const listContainer = document.querySelector('.scores-list');
const animationContainer = document.querySelectorAll('.message');
const refreshBtn = document.querySelector('.refresh');

const gameID = 'L5WwHwN7zdChbtO2i0g9';
const baseURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;

addForm.addEventListener('submit', (e) => {
  const name = e.target[0].value;
  const score = e.target[1].value;
  postToAPI(name, score, baseURL, animationContainer[1], animation);
  e.target[0].value = '';
  e.target[1].value = '';
  e.preventDefault();
});

const displayItems = (list) => {
  listContainer.innerHTML = '';

  list.forEach((e, index) => {
    const item = document.createElement('li');
    item.classList.add('list-item');
    if (index % 2) {
      item.classList.add('dark-bg');
    }
    item.innerHTML = `${e.user}: ${e.score}`;
    listContainer.appendChild(item);
  });
  animationContainer[0].innerHTML = 'Scores updates successfuly!';
  setTimeout(() => {
    animationContainer[0].innerHTML = '';
  }, 4000);
};

const callAPI = async () => {
  const list = await getFromAPI(baseURL, animationContainer[0], animation);
  displayItems(list);
};

refreshBtn.addEventListener('click', (event) => {
  event.preventDefault();
  callAPI();
});

callAPI();
