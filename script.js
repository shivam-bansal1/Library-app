const myLibrary = [];

// Book Object Constructor
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    return {title : this.title,
            author : this.author,
            pages : this.pages,
            status : this.status }
}

function addToLibrary(book) {
    myLibrary.push(book);
}

// Dummy books
let Book1 = new Book("Book1", "Author1", 345, "Not read yet");
addToLibrary(Book1);
let Book2 = new Book("Book2", "Author2", 35, "Read");
addToLibrary(Book2);

let cardContainer = document.querySelector('.card-container') ;

myLibrary.forEach((book) => {
    const statusCssClass = book.status == 'Read' ? "read" : "not-read";
    cardContainer.innerHTML += `
        <div class="card">
            <p class="title">"${book.title}"</p>
            <p class="author">${book.author}</p>
            <p class="pages">${book.pages} pages</p>
            <button class="status-button ${statusCssClass}">${book.status}</button>
            <button class="remove-button">Remove</button>
        </div>
    `

})

// Show dialog
const bodyElement = document.querySelector('body'); 
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector('.add-book-button');
addBookButton.addEventListener('click', () => {
    dialog.showModal();
    bodyElement.style.opacity = 0.2;
});

// Close dialog
const dialogBox = document.querySelector(".dialog-box");
const dialogBoxDiv = document.querySelector(".dialog-div");
dialogBox.addEventListener('click', () => { 
    dialog.close();
    bodyElement.style.opacity = 1;
});
dialogBoxDiv.addEventListener('click', (event) => event.stopPropagation());