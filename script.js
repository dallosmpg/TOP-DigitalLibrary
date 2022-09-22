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
function Book(title, author, numOfPages, isItRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isItRead = isItRead;
    this.arrayID = myLibrary.length;
}

// * Book prototype functions
Book.prototype.handleRemoveBookBtn = function (e) {
  console.log(e);
  console.log('It works!');
}
Book.prototype.handleReadBookBtn = function (e) {
  console.log(e);
}

// * Book card creating function
function addBookToLibrary(title, author, numOfPages, isItRead) {
    const newBook = new Book(title, author, numOfPages, isItRead);
    myLibrary.push(newBook);

    const arrayIndex = newBook.arrayID;
    const bookCardTemplate = `
  <div class="book-card-${arrayIndex} book-card" data-arrayID="${myLibrary[arrayIndex].arrayID}">
    <div>
      <h2>${myLibrary[arrayIndex].title}</h2>
      <p>by</p>
      <h3>${myLibrary[arrayIndex].author}</h3>
    </div>
    <p>The book is ${myLibrary[arrayIndex].numOfPages} pages long.</p>
    <button type="button" class="read-book-btn-${arrayIndex}">Read the book</button>
    <button type="button" class="remove-book-btn-${arrayIndex}">Remove book</button>
  </div>
  `;
  bookCardWrapper.innerHTML += bookCardTemplate;
  document.querySelector(`.remove-book-btn-${arrayIndex}`).addEventListener('click', myLibrary[arrayIndex].handleRemoveBookBtn);
  document.querySelector(`.read-book-btn-${arrayIndex}`).addEventListener('click', myLibrary[arrayIndex].handleReadBookBtn);
}

// * INput handler functions
function handleAddNewBookBtn(e) {
  addBookFormModal.classList.remove('hidden');
}
function handleConfirmNewBook(e) {
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
  addBookFormModal.classList.add('hidden');
}

// * Event listeners
console.log(myLibrary);
addNewBookBtn.addEventListener('click', handleAddNewBookBtn);
confirmNewBookBtn.addEventListener('click', handleConfirmNewBook);

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 345, true);
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkein', 564, true);
