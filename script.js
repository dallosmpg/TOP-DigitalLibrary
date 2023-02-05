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
    this.boundHandleReadBookBtn = this.handleReadBookBtn.bind(this);
    this.boundHandleUnreadBookBtn = this.handleUnreadBookBtn.bind(this);
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
    const nodeToDelete = document.querySelector(`.book-card-${this.bookID}`);
    const parentNode = nodeToDelete.parentElement;

    parentNode.removeChild(nodeToDelete);
    myLibrary.splice(nodeToDelete.dataset.arrayid, 1);
  };

  handleReadBookBtn = () => {
    // * Add book is read class -> CSS styling
    const parentBookCard = document
      .querySelector(`.book-card-${this.bookID}`)
      .closest('.book-card');
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
    const parentBookCard = document
      .querySelector(`.book-card-${this.bookID}`)
      .closest('.book-card');
    const bookID = parentBookCard.dataset.arrayid;

    const rdBtn = document.createElement('button');
    rdBtn.textContent = 'Read the book';
    rdBtn.classList.add(`read-book-btn-${bookID}`, `read-book-btn`);
    parentBookCard.querySelector('.book-buttons').appendChild(rdBtn);

    if (!parentBookCard.querySelector('.remove-book-btn')) {
      const rmBtn = document.createElement('button');
      rmBtn.textContent = 'Remove book';
      rmBtn.classList.add(`remove-book-btn-${bookID}`, 'remove-book-btn');
      parentBookCard.querySelector('.book-buttons').appendChild(rmBtn);
    }
    const unreadBookBtn = parentBookCard.querySelector('.unread-book');
    parentBookCard.querySelector('.book-buttons').removeChild(unreadBookBtn);

    parentBookCard.classList.remove('the-book-is-read');

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
  confirmNewBookBtn.addEventListener('click', handleConfirmNewBook);
}
function handleConfirmNewBook(e) {
  e.preventDefault();
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

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 345, false);
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkein', 564, true);
