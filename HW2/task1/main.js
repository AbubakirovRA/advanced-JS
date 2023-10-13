class LibraryManager {
    #books;

    constructor(initialBooks) {
        // Check for duplicate book titles in the initialBooks array
        if (new Set(initialBooks).size !== initialBooks.length) {
            throw new Error("В списке есть дубликаты");
        }

        this.#books = [...initialBooks];
    }

    get allBooks() {
        return this.#books;
    }

    addBook(title) {
        if (this.#books.includes(title)) {
            throw new Error("Такая книга уже добавлена");
        }

        this.#books.push(title);
    }

    removeBook(title) {
        const index = this.#books.indexOf(title);
        if (index === -1) {
            throw new Error("Книга ненайдена");
        }

        this.#books.splice(index, 1);
    }

    hasBook(title) {
        return this.#books.includes(title);
    }
}

const library = new LibraryManager(['Война и мир', 'Три толстяка', 'Сын полка']);

// Function to display the book list on the webpage
function displayBookList() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    library.allBooks.forEach((title) => {
        const li = document.createElement('li');
        li.textContent = title;
        bookList.appendChild(li);
    });
}

// Add Book button click event
document.getElementById('addBookButton').addEventListener('click', () => {
    const bookTitle = document.getElementById('bookTitle').value;
    if (bookTitle) {
        try {
            library.addBook(bookTitle);
            displayBookList();
        } catch (error) {
            alert(error.message);
        }
    }
});

// Remove Book button click event
document.getElementById('removeBookButton').addEventListener('click', () => {
    const bookTitle = document.getElementById('bookTitle').value;
    if (bookTitle) {
        try {
            library.removeBook(bookTitle);
            displayBookList();
        } catch (error) {
            alert(error.message);
        }
    }
});

// Initial book list display
displayBookList();
