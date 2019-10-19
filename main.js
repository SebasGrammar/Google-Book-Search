let bookName = document.querySelector(".book-name")
let container = document.querySelector(".container")
let booksContainer = document.querySelector(".books-container")
let searchButton = document.querySelector(".search-button")
let buttonsContainer = document.querySelector(".buttons-container")
let nextPage = document.querySelector(".next-page")
let searchBar = document.querySelector(".book-name")

function createEntry(title, imageURL, authors, releaseYear, language, publisher) {

  /* CONTAINING ELEMENT */
  let bookEntry = document.createElement("div")
  bookEntry.className = "book"

  /* CONTENT */
  bookEntry.innerHTML = `
  <h2 class="book-title">${title}</h2>
  <div class="info-display-format">
    <img class="book-cover" src="${imageURL}" />
    <div class="book-info">
      <h3>Author: <span>${authors}</span></h3>
      <h3>Release year: <span>${releaseYear}</span></h3>
      <h3>Publisher: <span>${publisher}</span></h3>
      <h3>Language: <span>${language}</span></h3>
    </div>
  </div>
  `

  return bookEntry

}

function removePastItems() { // REFACTOR THIS!
  while (booksContainer.firstChild) {
    booksContainer.firstChild.remove();
  }
  /*
  while (buttonsContainer.firstChild) {
    buttonsContainer.firstChild.remove()
  }
  */
  
}

/*
function switchIndex() {
  // totalItems / 10 -> round result to account for units.
  let page = document.createElement("a") // AND THIS
  page.textContent = 1
  page.setAttribute("href", "1")
  return page
}
*/


function getBookName() {
  return bookName.value
}

async function getBook(pageNumber = 0) { // Default value -> X
  //pageNumber = 0
  removePastItems()
  let books = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${getBookName()}&startIndex=${pageNumber}`) // 0, 10, 20, 30
                    .then(response => response.json())

  books.items.forEach(book => {
    console.log(book)
  })
  books.items.forEach(book => {

    let bookInfo = book.volumeInfo

    let bookTitle = bookInfo.title,
        imageURL = bookInfo.imageLinks.thumbnail,
        bookAuthors = bookInfo.authors,
        releaseYear = bookInfo.publishedDate,
        bookLanguage = bookInfo.language
        publisher = bookInfo.publisher

    booksContainer.append(createEntry(bookTitle, imageURL, bookAuthors, releaseYear, bookLanguage, publisher))

  })

}

searchButton.addEventListener("click", getBook)
searchBar.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    getBook()
  } 
})

/*
nextPage.addEventListener("click", function() {
  getBook(10)
})
*/

function nextP() {
  let number = 10;
  return function() {
    console.log(number)
    getBook(number)
    number += 10
  }
}

let innerFunction = nextP()


nextPage.addEventListener("click", innerFunction)

