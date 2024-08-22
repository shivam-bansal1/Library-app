const myLibrary = [];

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

let Book1 = new Book("Book1", "Author1", 345, "Not read yet");
addToLibrary(Book1);

let Book2 = new Book("Book2", "Author2", 35, "Completed");
addToLibrary(Book2);

console.log(myLibrary);