const bookCardWrapper = document.querySelector('.book-cards');
const addNewBookBtn = document.querySelector('.add-book-btn');
const addBookFormModal = document.querySelector('.add-book-form-modal');
const confirmNewBookBtn = document.querySelector('.confirm-book-btn');

// * Form elements:
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

// * Book btn templates
const readBookBtnTemplate = `<button type="button" class="read-book-btn- read-book-btn">Read the book</button>`;
const removeBookBtnTemplate = `<button type="button" class="remove-book-btn- remove-book-btn">Remove book</button>`;

// * Book holder array
const myLibrary = [];

// * Book constructor function
function Book(title, author, numOfPages, isItRead, bookID) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isItRead = isItRead;
  this.bookID = bookID;
}

// * Book button functions
function handleRemoveBookBtn(e) {
  const bookID = e.currentTarget.parentElement.dataset.arrayid;
  const nodeToDelete = document.querySelector(`.book-card-${bookID}`);
  const parentNode = nodeToDelete.parentElement;

  parentNode.removeChild(nodeToDelete);
  myLibrary.splice(e.currentTarget.parentElement.dataset.arrayid, 1);
}
function handleReadBookBtn(e) {
  console.log(e.currentTarget.parentElement);
  // * Add book is read class -> CSS styling
  const parentBookCard = e.currentTarget.parentElement;
  parentBookCard.classList.add('the-book-is-read');

  // *Remove read book btn
  parentBookCard.querySelector('.read-book-btn').remove();

  // * Create and add Unread book btn
  const button = document.createElement('button');
  button.classList.add('unread-book');
  button.textContent = `Unread the book`;
  parentBookCard.appendChild(button);

  button.addEventListener('click', handleUnreadBookBtn);
}

function handleUnreadBookBtn(e) {
  e.currentTarget.parentElement.classList.remove('the-book-is-read');
  console.log(
    '🚀 ~ file: script.js:55 ~ handleUnreadBookBtn ~ e.currentTarget',
    e.currentTarget.parentElement
  );
  const bookID = e.currentTarget.parentElement.dataset.arrayid;

  const rdBtn = document.createElement('button');
  rdBtn.textContent = 'Read the book';
  rdBtn.classList.add(`read-book-btn-${bookID}`, `read-book-btn`);
  e.currentTarget.parentElement.appendChild(rdBtn);

  if (!e.currentTarget.parentElement.querySelector('.remove-book-btn')) {
    const rmBtn = document.createElement('button');
    rmBtn.textContent = 'Remove book';
    rmBtn.classList.add(`remove-book-btn-${bookID}`, 'remove-book-btn');
    e.currentTarget.parentElement.appendChild(rmBtn);
  }

  const unreadBookBtn = document.querySelector('.unread-book');
  e.currentTarget.parentElement.removeChild(unreadBookBtn);

  attachEventListenerToBookBtns();
}

function attachEventListenerToBookBtns() {
  document
    .querySelectorAll('.read-book-btn')
    .forEach((book) => book.addEventListener('click', handleReadBookBtn));
  document
    .querySelectorAll('.remove-book-btn')
    .forEach((book) => book.addEventListener('click', handleRemoveBookBtn));
}

// * Book card creating function
function addBookToLibrary(title, author, numOfPages, isItRead) {
  const bookID = myLibrary.length;

  const newBook = new Book(title, author, numOfPages, isItRead, bookID);
  myLibrary.push(newBook);

  const bookCardTemplate = `
  <div class="book-card-${bookID} ${
    isItRead ? 'the-book-is-read' : ''
  } book-card" data-arrayID="${bookID}">
    <div class="book-content">
      <h2>${title}</h2>
      <p>by</p>
      <h3>${author}</h3>
    </div>
    <p>The book is ${numOfPages} pages long.</p>
    ${
      isItRead
        ? ''
        : `<button type="button" class="read-book-btn-${bookID} read-book-btn">Read the book</button>`
    }
    ${
      isItRead
        ? ''
        : `<button type="button" class="remove-book-btn-${bookID} remove-book-btn">Remove book</button>`
    }
  </div>
  `;
  bookCardWrapper.innerHTML += bookCardTemplate;
  // TODO - solve the removal of the other buttons when the book is read
  if (isItRead) {
    const unRdButton = document.createElement('button');
    unRdButton.classList.add('unread-book');
    unRdButton.textContent = `Unread the book`;
    document
      .querySelector(`.book-card-${bookID}`)
      .appendChild(unRdButton)
      .addEventListener('click', handleUnreadBookBtn);

    const rmButton = document.createElement('button');
    rmButton.classList.add('remove-book-btn');
    rmButton.textContent = `Remove book`;
    document
      .querySelector(`.book-card-${bookID}`)
      .appendChild(rmButton)
      .addEventListener('click', handleRemoveBookBtn);
  }
}

// * Input handler functions
function handleAddNewBookBtn(e) {
  addBookFormModal.classList.remove('hidden');
}
function handleConfirmNewBook(e) {
  const form = e.currentTarget.parentElement.parentElement;
  console.log(
    '🚀 ~ file: script.js:146 ~ handleConfirmNewBook ~ e.currentTarget.parentElement.parentElement',
    e.currentTarget.parentElement.parentElement
  );
  console.log(form.querySelector('#title'));
  if (
    form.querySelector('#title').value === '' ||
    form.querySelector('#author').value === '' ||
    form.querySelector('#pages').value === ''
  ) {
    alert('Please fill all the fields!');
    return;
  }
  console.log(typeof form.querySelector('#title').value);
  const bookID = myLibrary.length + 1;
  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.value,
    bookID
  );
  attachEventListenerToBookBtns();
  addBookFormModal.classList.add('hidden');
}

// * Modal closing function
window.addEventListener('click' || 'keydown', (e) => {
  if (e.target === addBookFormModal) {
    addBookFormModal.classList.toggle('hidden');
  }
});

// * Event listeners
addNewBookBtn.addEventListener('click', handleAddNewBookBtn);
confirmNewBookBtn.addEventListener('click', handleConfirmNewBook);

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 345, false);
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkein', 564, true);
attachEventListenerToBookBtns();
