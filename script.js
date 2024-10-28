import { validateField } from "./validate.js";

// Book Class
class Book {
  constructor(id, title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class BookManager {
  constructor() {
    this.myLibrary = this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const myLibrary = localStorage.getItem("myLibrary");
    return myLibrary ? JSON.parse(myLibrary) : [];
  }

  saveToLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(this.myLibrary));
  }

  addToLibrary(title, author, pages, status) {
    const idCount = Math.floor(Math.random() * 100000) + 10000;
    console.log(idCount);
    const newBook = new Book(idCount, title, author, pages, status);
    console.log(newBook);
    console.log(this.myLibrary);

    if (this.myLibrary.length === 0) {
      this.myLibrary.push(newBook);
    }
    this.myLibrary.some((book) =>
      book.title === title && book.author === author
        ? alert(`${title} by ${author} already saved!!!`)
        : this.myLibrary.push(newBook)
    );

    console.log(this.myLibrary);
    this.saveToLocalStorage();
  }

  removeFromLibrary(id) {
    this.myLibrary = this.myLibrary.filter((book) => book.id != id);
    this.saveToLocalStorage();
  }

  updateReadingStatus(id) {
    this.myLibrary.forEach((book) => {
      if (book.id == id) book.status = !book.status;
    });

    this.saveToLocalStorage();
  }
}

function addNewBook() {
  // Submit form to add new book
  const dialogForm = document.querySelector(".dialog-form");

  validateField("dialog-book-title", "title-error");
  validateField("dialog-book-author", "author-error");
  validateField("dialog-book-pages", "pages-error");

  dialogForm.addEventListener("submit", (event) => {
    // Prevents default behaviour i.e. doesn't try to submit and refresh the page
    event.preventDefault();

    const title = document.querySelector(".dialog-book-title");
    const author = document.querySelector(".dialog-book-author");
    const pages = document.querySelector(".dialog-book-pages");
    const readingStatus = document.querySelector(".reading-status").checked;
    const error = document.querySelector(`#missing-field-error`);

    if (
      title.validity.valueMissing ||
      title.validity.tooShort ||
      title.validity.tooLong ||
      author.validity.valueMissing ||
      author.validity.tooShort ||
      author.validity.tooLong ||
      pages.validity.valueMissing
    ) {
      error.textContent = "Check all the fields!!!";
      error.className = "error";
    } else {
      error.textContent = "";
      error.className = "error";

      BookManagerObject.addToLibrary(
        title.value,
        author.value,
        pages.value,
        readingStatus
      );

      // Create book cards
      createBookCard();
      dialogForm.reset();
      closeDialogBox();
    }
  });
}

function removeBook() {
  // Remove book and change reading status
  const bookCardsContainer = document.querySelector(".card-container");
  bookCardsContainer.addEventListener("click", function (event) {
    // Remove book
    if (event.target.classList.contains("remove-button")) {
      const bookId = event.target.dataset.bookId;
      BookManagerObject.removeFromLibrary(bookId);
      window.location.reload();
    }
  });
}

function updateReadStatus() {
  // Change Reading Status
  const bookCardsContainer = document.querySelector(".card-container");
  bookCardsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("status-button")) {
      console.log(event.target.dataset);
      BookManagerObject.updateReadingStatus(event.target.dataset.id);
      window.location.reload();
    }
  });
}

function createBookCard() {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";
  const library = BookManagerObject.loadFromLocalStorage("myLibrary");

  library.forEach((book) => {
    const statusCssClass = book.status == true ? "read" : "not-read";
    cardContainer.innerHTML += `
          <div class="card">
          <p class="title">"${book.title}"</p>
          <p class="author">${book.author}</p>
          <p class="pages">${book.pages} pages</p>
          <button class="status-button ${statusCssClass}" data-id="${book.id}">
              ${book.status == true ? "Read" : "Not read yet"}
          </button>
          <button class="remove-button"
            data-book-id="${book.id}">
            Remove
          </button>
          </div>
          `;
  });
}

// Show dialog
const bodyElement = document.querySelector("body");
const dialogBox = document.querySelector(".dialog-box");
const dialogBoxDiv = document.querySelector(".dialog-div");
const addBookButton = document.querySelector(".add-book-button");

// Close dialog
function closeDialogBox() {
  dialogBox.close();
  bodyElement.style.opacity = 1;
}

function main() {
  addBookButton.addEventListener("click", () => {
    dialogBox.showModal();
    bodyElement.style.opacity = 0.2;
  });

  dialogBox.addEventListener("click", closeDialogBox);
  dialogBoxDiv.addEventListener("click", (event) => event.stopPropagation());

  addNewBook();
  removeBook();
  createBookCard();
  updateReadStatus();
}

const BookManagerObject = new BookManager();
main();
