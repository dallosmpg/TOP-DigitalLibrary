const bookCardWrapper = document.querySelector('.book-cards');
const addNewBookBtn = document.querySelector('.add-book-btn');
const addBookFormModal = document.querySelector('.add-book-form-modal')
let myLibrary = [];

function Book(title, author, numOfPages, isItRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isItRead = isItRead;
    this.arrayID = myLibrary.length;
}

function addBookToPage(title, author, numOfPages, isItRead) {
  const bookCardTemplate = `
  <div class="book-card">
  <div>
  <h2>${title}</h2>
  <p>by</p>
  <h3>${author}</h3>
  </div>
  <p>The book is ${numOfPages} pages long.</p>
  </div>
  `; 

  bookCardWrapper.innerHTML += bookCardTemplate
}

function addBookToLibrary(title, author, numOfPages, isItRead) {
    const newBook = new Book(title, author, numOfPages, isItRead)
    myLibrary.push(newBook);
    addBookToPage(title, author, numOfPages, isItRead);
}

function handleAddNewBookBtn(e) {
  console.log(e);
  addBookFormModal.classList.remove('hidden')

}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 345, true);
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkein', 564, true);

console.log(myLibrary);
addNewBookBtn.addEventListener('click', handleAddNewBookBtn)