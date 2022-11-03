// * Wrappers, modals & buttons:
const bookCardWrapper = document.querySelector('.book-cards');
const addNewBookBtn = document.querySelector('.add-book-btn');
const addBookFormModal = document.querySelector('.add-book-form-modal');
const confirmNewBookBtn = document.querySelector('.confirm-book-btn');


// * Form elements:
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

// * Book holder array
let myLibrary = [];

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
  console.log(parentNode, nodeToDelete);
  myLibrary.splice(e.currentTarget.parentElement.dataset.arrayid, 1);
}
function handleReadBookBtn(e) {
  console.log(e);
}

function attachEventListenerToBookBtns() {
  document.querySelectorAll('.read-book-btn').forEach(book => book.addEventListener('click', handleReadBookBtn));
  document.querySelectorAll('.remove-book-btn').forEach(book => book.addEventListener('click', handleRemoveBookBtn));
}

// * Book card creating function
function addBookToLibrary(title, author, numOfPages, isItRead) {
    const bookID = myLibrary.length;

    const newBook = new Book(title, author, numOfPages, isItRead, bookID);
    myLibrary.push(newBook);

    const bookCardTemplate = `
  <div class="book-card-${bookID} book-card" data-arrayID="${bookID}">
    <div>
      <h2>${title}</h2>
      <p>by</p>
      <h3>${author}</h3>
    </div>
    <p>The book is ${numOfPages} pages long.</p>
    <button type="button" class="read-book-btn-${bookID} read-book-btn">Read the book</button>
    <button type="button" class="remove-book-btn-${bookID} remove-book-btn">Remove book</button>
  </div>
  `;
  bookCardWrapper.innerHTML += bookCardTemplate;
}

// * Input handler functions
function handleAddNewBookBtn(e) {
  addBookFormModal.classList.remove('hidden');
}
function handleConfirmNewBook(e) {
  const bookID = myLibrary.length + 1;
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value, bookID);
  attachEventListenerToBookBtns();
  addBookFormModal.classList.add('hidden');
}

// * Event listeners
addNewBookBtn.addEventListener('click', handleAddNewBookBtn);
confirmNewBookBtn.addEventListener('click', handleConfirmNewBook);

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 345, true);
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkein', 564, true);
attachEventListenerToBookBtns();