function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read || false;

  this.info = function () {
    const readStatement = this.read ? "already read" : "not yet read";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatement}.`;
  };
}

const book = new Book("The Hobbit", "J. R. R. Tolkein", "295", read);

console.log(book.info());
