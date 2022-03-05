import './animation.css';
import './secondary-animation.css';
import './style.css';
import './modules/secondary-animation.js';
import animation from './modules/animation.js';
import postToAPI from './modules/post-score.js';
import getFromAPI from './modules/get-scores.js';

const addForm = document.querySelector('.form');
const listContainer = document.querySelector('.scores-list');
const animationContainer = document.querySelectorAll('.message');
const refreshBtn = document.querySelector('.refresh');
const flashed = document.querySelector('.flashed');

const gameID = 'tJ4X8roi0k80K6LGqq68';
const baseURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target[0].value;
  const score = e.target[1].value;
  await postToAPI(name, score, baseURL, animationContainer[1], animation);
  e.target[0].value = '';
  e.target[1].value = '';

  refreshBtn.classList.remove('display-none');
  flashed.classList.add('blink');
});

const displayItems = (list) => {
  listContainer.innerHTML = '';
  let leaderboard = 0;
  let bestScore = 0;
  list.forEach((e, index) => {
    const item = document.createElement('li');
    item.classList.add('list-item');
    const addClass = () => item.classList.add(`bg-${leaderboard}`);
    if (leaderboard === 4) {
      leaderboard = 0;
      bestScore = 0;
    } else if (index === 0) {
      leaderboard += 1;
      addClass();
      bestScore = e.score;
    } else if (e.score === bestScore) {
      addClass();
    } else if (parseInt(e.score, 10) < parseInt(bestScore, 10)) {
      bestScore = e.score;
      leaderboard += 1;
      addClass();
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
  flashed.classList.remove('blink');
  refreshBtn.classList.add('display-none');
  list.sort((a, b) => b.score - a.score);

  displayItems(list);
};

refreshBtn.addEventListener('click', (event) => {
  event.preventDefault();

  callAPI();
});

callAPI();
