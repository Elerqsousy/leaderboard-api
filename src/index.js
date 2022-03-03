import './style.css';
import Data from './modules/data.js';

const list = new Data();

const addForm = document.querySelector('.form');
const listContainer = document.querySelector('.scores-list');

const displayItems = () => {
  listContainer.innerHTML = '';
  list.list.forEach((e, index) => {
    const item = document.createElement('li');
    item.classList.add('list-item');
    if (index % 2) {
      item.classList.add('dark-bg');
    }
    item.innerHTML = `${e.name}: ${e.score}`;
    listContainer.appendChild(item);
  });
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target[0].value;
  const score = e.target[1].value;
  list.add(name, score);
  displayItems();
});
