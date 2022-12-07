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
  const nodeToDelete = e.target.closest('.book-card');
  const parentNode = nodeToDelete.parentElement;

  parentNode.removeChild(nodeToDelete);
  myLibrary.splice(nodeToDelete.dataset.arrayid, 1);
}
function handleReadBookBtn(e) {
  console.log(e.currentTarget.parentElement);
  // * Add book is read class -> CSS styling
  const parentBookCard = e.target.closest('.book-card');
  parentBookCard.classList.add('the-book-is-read');

  // *Remove read book btn
  parentBookCard.querySelector('.read-book-btn').remove();

  // * Create and add Unread book btn
  const button = document.createElement('button');
  button.classList.add('unread-book');
  button.textContent = `Unread the book`;
  parentBookCard.querySelector('.book-buttons').appendChild(button);

  button.addEventListener('click', handleUnreadBookBtn);
}

function handleUnreadBookBtn(e) {
  console.log('handle unread btn click');
  const parentBookCard = e.target.closest('.book-card');
  const bookID = parentBookCard.dataset.arrayid;

  const rdBtn = document.createElement('button');
  rdBtn.textContent = 'Read the book';
  rdBtn.classList.add(`read-book-btn-${bookID}`, `read-book-btn`);
  console.log(parentBookCard.querySelector('.book-buttons'));
  parentBookCard.querySelector('.book-buttons').appendChild(rdBtn);

  if (!parentBookCard.querySelector('.remove-book-btn')) {
    const rmBtn = document.createElement('button');
    rmBtn.textContent = 'Remove book';
    rmBtn.classList.add(`remove-book-btn-${bookID}`, 'remove-book-btn');
    parentBookCard.querySelector('.book-buttons').appendChild(rmBtn);
  }
  const unreadBookBtn = parentBookCard.querySelector('.unread-book');
  console.log('it gets here', parentBookCard, unreadBookBtn);
  parentBookCard.querySelector('.book-buttons').removeChild(unreadBookBtn);

  parentBookCard.classList.remove('the-book-is-read');

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
      <p>The book is ${numOfPages} pages long.</p>
    </div>
    <div class="book-buttons">
    ${
      isItRead
        ? ''
        : `<button type="button" class="remove-book-btn-${bookID} remove-book-btn">Remove book</button>`
    }
    ${
      isItRead
        ? ''
        : `<button type="button" class="read-book-btn-${bookID} read-book-btn">Read the book</button>`
    }
    </div>
  </div>
  `;
  bookCardWrapper.innerHTML += bookCardTemplate;
  // TODO - solve the removal of the other buttons when the book is read
  if (isItRead) {
    const rmButton = document.createElement('button');
    rmButton.classList.add('remove-book-btn');
    rmButton.textContent = `Remove book`;
    document
      .querySelector(`.book-card-${bookID}`)
      .querySelector('.book-buttons')
      .appendChild(rmButton)
      .addEventListener('click', handleRemoveBookBtn);

    const unRdButton = document.createElement('button');
    unRdButton.classList.add('unread-book');
    unRdButton.textContent = `Unread the book`;
    document
      .querySelector(`.book-card-${bookID}`)
      .querySelector('.book-buttons')
      .appendChild(unRdButton)
      .addEventListener('click', handleUnreadBookBtn);
  }
}

// * Input handler functions
function handleAddNewBookBtn(e) {
  addBookFormModal.classList.remove('hidden');
}
function handleConfirmNewBook(e) {
  const form = e.currentTarget.parentElement.parentElement;
  if (
    form.querySelector('#title').value === '' ||
    form.querySelector('#author').value === '' ||
    form.querySelector('#pages').value === ''
  ) {
    alert('Please fill all the fields!');
    return;
  }
  const bookID = myLibrary.length + 1;
  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked,
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
