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
const myLibrary = [];

// * Book class
class Book {
  constructor(title, author, numOfPages, isItRead, bookID) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isItRead = isItRead;
    this.bookID = bookID;
    this.boundHandleRemoveBookBtn = this.handleRemoveBookBtn.bind(this);
    // this.removeButton = document.querySelector(
    //   `.remove-book-btn-${this.bookID}`
    // );
    this.boundHandleReadBookBtn = this.handleReadBookBtn.bind(this);
    // this.readButton = document.querySelector(`.read-book-btn-${this.bookID}`);
    this.boundHandleUnreadBookBtn = this.handleUnreadBookBtn.bind(this);
    // this.unreadButton = document.querySelector(
    //   `.unread-book-btn-${this.bookID}`
    // );
    this.boundAttachEventListenerToBookBtns =
      this.attachEventListenerToBookBtns.bind(this);
  }

  get removeButton() {
    return document.querySelector(`.remove-book-btn-${this.bookID}`);
  }

  get readButton() {
    return document.querySelector(`.read-book-btn-${this.bookID}`);
  }

  get unreadBookBtn() {
    return document.querySelector(`.unread-book-btn-${this.bookID}`);
  }

  handleRemoveBookBtn = function () {
    console.log('im running');
    const nodeToDelete = document.querySelector(`.book-card-${this.bookID}`);
    const parentNode = nodeToDelete.parentElement;

    parentNode.removeChild(nodeToDelete);
    myLibrary.splice(nodeToDelete.dataset.arrayid, 1);
    this.boundAttachEventListenerToBookBtns();
  };

  handleReadBookBtn = () => {
    // * Add book is read class -> CSS styling
    const parentBookCard = document
      .querySelector(`.book-card-${this.bookID}`)
      .closest('.book-card');
    console.log(parentBookCard);
    parentBookCard.classList.add('the-book-is-read');

    // * Remove read book btn
    parentBookCard.querySelector('.read-book-btn').remove();

    // * Create and add Unread book btn
    const button = document.createElement('button');
    button.classList.add('unread-book');
    button.textContent = `Unread the book`;
    parentBookCard.querySelector('.book-buttons').appendChild(button);

    button.addEventListener('click', this.handleUnreadBookBtn);
    this.boundAttachEventListenerToBookBtns();
  };

  handleUnreadBookBtn = () => {
    console.log('handle unread btn click');
    const parentBookCard = document
      .querySelector(`.book-card-${this.bookID}`)
      .closest('.book-card');
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

    console.log(this);
    this.boundAttachEventListenerToBookBtns();
  };

  // TODO Fix event listeners
  attachEventListenerToBookBtns() {
    this.removeButton.addEventListener('click', this.boundHandleRemoveBookBtn, {
      once: true,
    });
    if (this.readButton) {
      this.readButton.addEventListener('click', this.boundHandleReadBookBtn, {
        once: true,
      });
      return;
    }
    if (this.unreadBookBtn) {
      this.unreadBookBtn.addEventListener(
        'click',
        this.boundHandleUnreadBookBtn,
        {
          once: true,
        }
      );
    }
  }
}

// * Book button functions
// ! handle remove book btn
// function handleRemoveBookBtn(e) {
//   const nodeToDelete = e.target.closest('.book-card');
//   const parentNode = nodeToDelete.parentElement;

//   parentNode.removeChild(nodeToDelete);
//   myLibrary.splice(nodeToDelete.dataset.arrayid, 1);
// }

// ! handle read book btn
// function handleReadBookBtn(e) {
//   console.log(e.currentTarget.parentElement);
//   // * Add book is read class -> CSS styling
//   const parentBookCard = e.target.closest('.book-card');
//   parentBookCard.classList.add('the-book-is-read');

//   // *Remove read book btn
//   parentBookCard.querySelector('.read-book-btn').remove();

//   // * Create and add Unread book btn
//   const button = document.createElement('button');
//   button.classList.add('unread-book');
//   button.textContent = `Unread the book`;
//   parentBookCard.querySelector('.book-buttons').appendChild(button);

//   button.addEventListener('click', handleUnreadBookBtn);
// }

// ! handle unread book btn
// function handleUnreadBookBtn(e) {
//   console.log('handle unread btn click');
//   const parentBookCard = e.target.closest('.book-card');
//   const bookID = parentBookCard.dataset.arrayid;

//   const rdBtn = document.createElement('button');
//   rdBtn.textContent = 'Read the book';
//   rdBtn.classList.add(`read-book-btn-${bookID}`, `read-book-btn`);
//   console.log(parentBookCard.querySelector('.book-buttons'));
//   parentBookCard.querySelector('.book-buttons').appendChild(rdBtn);

//   if (!parentBookCard.querySelector('.remove-book-btn')) {
//     const rmBtn = document.createElement('button');
//     rmBtn.textContent = 'Remove book';
//     rmBtn.classList.add(`remove-book-btn-${bookID}`, 'remove-book-btn');
//     parentBookCard.querySelector('.book-buttons').appendChild(rmBtn);
//   }
//   const unreadBookBtn = parentBookCard.querySelector('.unread-book');
//   console.log('it gets here', parentBookCard, unreadBookBtn);
//   parentBookCard.querySelector('.book-buttons').removeChild(unreadBookBtn);

//   parentBookCard.classList.remove('the-book-is-read');

//   attachEventListenerToBookBtns();
// }

// function attachEventListenerToBookBtns() {
//   console.log(myLibrary[0].bookID, this);
//   document
//     .querySelectorAll('.read-book-btn')
//     .forEach((book) => book.addEventListener('click', this.handleReadBookBtn));
//   document
//     .querySelectorAll('.remove-book-btn')
//     .forEach((book) =>
//       book.addEventListener('click', () => this.handleRemoveBookBtn)
//     );
// }

// * Book card creating function
function addBookToLibrary(title, author, numOfPages, isItRead) {
  const bookID = myLibrary.length;

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
  bookCardWrapper.insertAdjacentHTML('beforeend', bookCardTemplate);

  if (isItRead) {
    const rmButton = document.createElement('button');
    rmButton.classList.add(`remove-book-btn-${bookID}`, 'remove-book-btn');
    rmButton.textContent = `Remove book`;
    document
      .querySelector(`.book-card-${bookID}`)
      .querySelector('.book-buttons')
      .appendChild(rmButton);
    // .addEventListener('click', Book.prototype.handleRemoveBookBtn);

    const unRdButton = document.createElement('button');
    unRdButton.classList.add(`unread-book-btn-${bookID}`, 'unread-book');
    unRdButton.textContent = `Unread the book`;
    document
      .querySelector(`.book-card-${bookID}`)
      .querySelector('.book-buttons')
      .appendChild(unRdButton);
    // .addEventListener('click', this.handleUnreadBookBtn);
  }
  const newBook = new Book(title, author, numOfPages, isItRead, bookID);
  myLibrary.push(newBook);
  myLibrary[bookID].boundAttachEventListenerToBookBtns();
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
  const bookID = myLibrary.length;
  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked,
    bookID
  );
  addBookFormModal.classList.add('hidden');
  myLibrary[bookID].boundAttachEventListenerToBookBtns();
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
