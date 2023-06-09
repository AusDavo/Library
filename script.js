class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    const readStatement = this.read ? "already read" : "not yet read";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatement}.`;
  }
}

const myLibrary = [
  new Book("To Kill a Mockingbird", "Harper Lee", "281", true),
  new Book("Pride and Prejudice", "Jane Austen", "279", false),
  new Book("1984", "George Orwell", "328", true),
  new Book("The Catcher in the Rye", "J.D. Salinger", "234", true),
  new Book(
    "One Hundred Years of Solitude",
    "Gabriel Garcia Marquez",
    "417",
    false
  ),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", "180", false),
  new Book("Moby Dick", "Herman Melville", "624", true),
  new Book("The Picture of Dorian Gray", "Oscar Wilde", "254", true),
  new Book("Wuthering Heights", "Emily Bronte", "348", false),
  new Book("Don Quixote", "Miguel de Cervantes", "863", false),
  new Book("Jane Eyre", "Charlotte Bronte", "507", true),
  new Book("The Brothers Karamazov", "Fyodor Dostoevsky", "796", true),
  new Book("Middlemarch", "George Eliot", "880", false),
  new Book("War and Peace", "Leo Tolstoy", "1225", true),
  new Book("The Odyssey", "Homer", "541", true),
  new Book("The Divine Comedy", "Dante Alighieri", "928", false),
  new Book("Frankenstein", "Mary Shelley", "280", false),
  new Book("Crime and Punishment", "Fyodor Dostoevsky", "671", true),
  new Book("Heart of Darkness", "Joseph Conrad", "72", true),
  new Book("The Canterbury Tales", "Geoffrey Chaucer", "504", false),
];

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.unshift(newBook);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const pages = form.elements.pages.value;
  const read = form.elements.read.checked;

  addBookToLibrary(title, author, pages, read);
  form.reset();

  renderBookCards();
}

function renderBookCards() {
  const bookCards = document.getElementById("book-cards");
  bookCards.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = createBookCard(book);
    bookCards.appendChild(card);
  });
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");

  const remove = document.createElement("button");
  remove.textContent = "X";
  remove.classList.add("remove-button");
  card.appendChild(remove);

  const title = document.createElement("h2");
  title.textContent = book.title;
  card.appendChild(title);

  const author = document.createElement("p");
  author.textContent = `by ${book.author}`;
  card.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;
  card.appendChild(pages);

  const checkbox = document.createElement("input");
  const index = myLibrary.indexOf(book);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", `s${index}`);
  checkbox.classList.add("switch");
  checkbox.checked = book.read; // set the initial checkbox state
  card.appendChild(checkbox);

  // Listen for the change event on the checkbox
  checkbox.addEventListener("change", (event) => {
    // Update the corresponding object in the array
    book.read = event.target.checked;
    renderBookCards();
  });

  const label = document.createElement("label");
  label.setAttribute("for", `s${index}`);
  label.textContent = book.read ? "Read" : "Unread";
  card.appendChild(label);

  remove.addEventListener("click", () => {
    const index = myLibrary.indexOf(book);
    if (index > -1) {
      myLibrary.splice(index, 1);
    }
    renderBookCards();
  });

  return card;
}

const showFormButton = document.getElementById("show-form-button");
const myForm = document.getElementById("add-book-form");

showFormButton.addEventListener("click", () => {
  myForm.style.display = "block";
  showFormButton.style.display = "none";
});

const form = document.getElementById("add-book-form");
form.addEventListener("submit", handleFormSubmit);

// Call renderBookCards function to create the initial book cards
renderBookCards();
