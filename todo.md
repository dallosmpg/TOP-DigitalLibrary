- [ ] Create click out of modal dissapearing function

``` javascript
  function handleReadBookBtn(e) {
    e.currentTarget.parentElement.classList.add('the-book-is-read');
    const button = document.createElement('button');
    button.classList.add('unread-book');
    button.textContent = `Unread the book`;
    e.currentTarget.parentElement.appendChild(button);

    const readBookBtn = e.currentTarget.parentElement.children[3];
    e.currentTarget.parentElement.removeChild(readBookBtn);
    const removeBookBtn =
        e.currentTarget.parentElement.querySelector('.remove-book-btn');
    e.currentTarget.parentElement.removeChild(removeBookBtn);

    const unreadBookBtn = document.querySelector('.unread-book');
    unreadBookBtn.addEventListener('click', handleUnreadBookBtn);
}
  ```