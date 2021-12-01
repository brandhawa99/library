let myLibrary = []; 
function Book(title, author,read){
    this.title = title; 
    this.author = author;
    // this.about_the_book = about_the_book; 
    this.read = false; 
}

Book.prototype.updateRead = function(){
    this.read = !this.read
}
Book.prototype.getTitle = function(){
    return this.title; 
}
Book.prototype.getAuthor = function(){
    return this.author;
}
const button  = document.querySelector('.addBook');
const library = document.querySelector('.library');
const close_button = document.querySelector('.closing-button')



function addBookToLibrary(){
    // Get input
    const author = document.getElementById('get-author');
    const title = document.getElementById('get-title');

    //Check if input is valid 
    if(author.value == "" || title.value == ""){
        return; 
    }
    addBookToElement(title.value,author.value)
    
    myLibrary.push(new Book(title.value,author.value))
    title.value = ""; 
    author.value = ""; 
    console.log(myLibrary);
}

function addBookToElement(title , author){
    //Get elements
    const book = document.createElement('div')
    const book_title = document.createElement('div');
    const author_name = document.createElement('div');
    
    //apply classes to elements 
    book.className = "book-container"
    book_title.className = "book-title"
    author_name.className = "book-author"
    
    //set text in element
    book_title.innerHTML = title; 
    author_name.innerHTML = author
    //Add title and author to card
    book.appendChild(book_title)
    book.appendChild(author_name)
    //add card to library 
    library.prepend(book);


}
const form = document.querySelector('.form');

button.addEventListener('click',() =>{
    // form.setAttribute('style','visibilty:visible;')
})

//Close Popup Button 
close.addEventListener('click',() =>{
    // form.setAttribute('style','visibility: hidden;')
})
