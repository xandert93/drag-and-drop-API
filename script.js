/*DRAG-AND-DROP FUNCTIONS*/
const setDraggedIndex = (e) =>
  (draggedIndex = +e.currentTarget.parentNode.getAttribute('data-index'));

const addEnterShade = (e) => e.currentTarget.classList.add('entered');

const removeEnterShade = (e) => e.currentTarget.classList.remove('entered');

const swapPeople = (e) => {
  const droppedIndex = +e.currentTarget.getAttribute('data-index');
  e.currentTarget.classList.remove('entered');
  if (draggedIndex === droppedIndex) return;

  const dragged = listItems[draggedIndex].querySelector('.draggable');
  const droppedOnto = listItems[droppedIndex].querySelector('.draggable');

  listItems[draggedIndex].appendChild(droppedOnto);
  listItems[droppedIndex].appendChild(dragged);
};

/*VERIFY LIST ORDER*/
const checkOrder = () => {
  listItems.forEach((listItem, idx) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== peopleNames[idx]) {
      listItem.classList.add('wrong');
      setTimeout(() => listItem.classList.remove('wrong'), 3000);
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
      setTimeout(() => listItem.classList.remove('right'), 3000);
    }
  });
};

/*GLOBAL QUERY SELECTORS*/
const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check-btn');

const peopleNames = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// Store's initial render's list in UI's order. Will use for future reference.
const listItems = [];

let draggedIndex;

// Insert list items into DOM
const createList = () => {
  [...peopleNames]
    .map((name) => ({ name, randomId: Math.random() }))
    .sort((person1, person2) => person1.randomId - person2.randomId)
    .map((person) => person.name)
    .forEach((name, idx) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', idx);

      listItem.innerHTML = `
        <span class="number">${++idx}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${name}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
};

createList();

/*ADDING EVENT LISTENERS AFTER LIST INSERTED INTO DOM*/
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.ondrag = setDraggedIndex;
  });

  dragListItems.forEach((listItem) => {
    listItem.ondragover = (e) => e.preventDefault();
    listItem.ondrop = swapPeople;
    listItem.ondragenter = addEnterShade;
    listItem.ondragleave = removeEnterShade;
  });
}

checkBtn.onclick = checkOrder;
