// Book Class
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    static myLibrary = [];

    addToLibrary(){
        Book.myLibrary.push({
            title: this.title,
            author: this.author, 
            pages: this.pages, 
            status: this.status
        });
    }
}

function createBookCard() {
    const cardContainer = document.querySelector('.card-container') ;
    cardContainer.innerHTML = '';

    Book.myLibrary.forEach((book) => {
        const statusCssClass = book.status == true ? "read" : "not-read";
        cardContainer.innerHTML += `
            <div class="card">
                <p class="title">"${book.title}"</p>
                <p class="author">${book.author}</p>
                <p class="pages">${book.pages} pages</p>
                <button class="status-button ${statusCssClass}">${book.status==true ? "Read": "Not read yet"}</button>
                <button class="remove-button">Remove</button>
            </div>
        `
    })
}

// Show dialog
const bodyElement = document.querySelector('body'); 
const dialogBox = document.querySelector(".dialog-box");
const dialogBoxDiv = document.querySelector(".dialog-div");
const addBookButton = document.querySelector('.add-book-button');

addBookButton.addEventListener('click', () => {
    dialogBox.showModal();
    bodyElement.style.opacity = 0.2;
});

// Close dialog
function closeDialogBox() {
    dialogBox.close();
    bodyElement.style.opacity = 1;
}
dialogBox.addEventListener('click', closeDialogBox);
dialogBoxDiv.addEventListener('click', (event) => event.stopPropagation());

// Submit form to add new book
const dialogForm = document.querySelector('.dialog-form');
dialogForm.addEventListener('submit', (event)=> {
    // Prevents default behaviour i.e. doesn't try to submit and refresh the page
    event.preventDefault();

    const title = document.querySelector('.dialog-book-title').value;
    const author = document.querySelector('.dialog-book-author').value;
    const pages = document.querySelector('.dialog-book-pages').value;
    const readingStatus = document.querySelector('.reading-status').checked;

    let newBook = new Book(title, author, pages, readingStatus);
    newBook.addToLibrary();
    
    // Create book cards
    createBookCard();
    
    dialogForm.reset();
    closeDialogBox();
});

// Remove book and change reading status
const bookCardsContainer = document.querySelector(".card-container");
bookCardsContainer.addEventListener('click', function(event) {
    // Remove book
    if (event.target.classList.contains('remove-button')) {
        const cardDiv = event.target.closest('.card');
        cardDiv.remove();
    }

    // Change Reading Status
    if (event.target.classList.contains('status-button')) {
        console.log(event.target.classList);
        const readingStatusButton = event.target.closest('.status-button');
        if(event.target.classList.contains('not-read')) {
            readingStatusButton.classList = 'status-button read';
            readingStatusButton.textContent = 'Read';
        }
        else if(event.target.classList.contains('read')) {
            readingStatusButton.classList = 'status-button not-read';
            readingStatusButton.textContent = 'Not read yet';
        }
    }
});