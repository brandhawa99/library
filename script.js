// OPEN AND CLOSE MODAL 
let ELEMENT_ID = 1000; 

const openModalButton = document.getElementById('open-modal')
const closeModalButton = document.querySelector('.close-button')
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
overlay.addEventListener('click',() =>{
    closeModal(modal);
})

function openModal(modal){
    if(modal == null){
        return
    }
    modal.classList.add('active');
    overlay.classList.add('active');
}

openModalButton.addEventListener('click',() =>{
    openModal(modal);
})

closeModalButton.addEventListener('click',()=>{
    closeModal(modal);
})

function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
// END OF MODAL PART

let myLibrary = [];
function Book (title,author, read){
    this.title = title ;
    this.author = author; 
    this.read = read; 
    this.id; 

}
Book.prototype.getTitle = function(){
    return this.title; 
}
Book.prototype.getAuthor = function(){
    return this.author;
}
Book.prototype.updateRead = function(checked){
    this.read = !this.read;
}
Book.prototype.getRead = function(){
    return this.read;
}
Book.prototype.setId = function(){
    this.id = ELEMENT_ID;
    ELEMENT_ID++;
}
Book.prototype.getId = function(){
    return this.id; 
}

//GET DATA FROM MODAL 
const submit_button = document.querySelector('.submit');

submit_button.addEventListener('click',()=>{
    const library = document.querySelector('.library');

    let title , author, read
    title = getTitle(); 
    author = getAuthor(); 
    read = getRead(); 
    
    if(title==null || author == null){
        console.log('No data Entered')
    }

    let book = mkObj(title,author,read);

    let element = mkElements(title,author,read,book.getId);
    library.appendChild(element);
    closeModal(modal);
    resetVales();
    // CLSOE THE MODAL AFTER HITTING SUBMIT

})

function getTitle(){
    let title = document.querySelector('.title-data').value
    return title
}
function getAuthor(){
    
    let author = document.querySelector('.author-data').value
    return author;

}
function getRead(){
    return document.querySelector('.read-data').checked
}
//set the values of all the modal back to empty
function resetVales(){
    document.querySelector('.title-data').value = "";
    document.querySelector('.author-data').value = "";
    document.querySelector('.read-data').checked = false;
}


//make book object place in myLibrary arry 
//Returns the book that was added to the array 
function mkObj(title,author,read){
    const book = new Book(title,author,read); 
    book.setId(); 
    myLibrary.push(book);
    return book; 
}


//Return the container with all the elements needed inside of it
// to be appened to library 
function mkElements(title,author,read,id){
    //CREATE ELEMENTS 
    const container = document.createElement('div');
    const title_element = document.createElement('div');
    const author_element = document.createElement('div');
    const finished_button = document.createElement('button');
    //add classes
    title_element.classList = "text-xl font-semibold"
    author_element.classList ="text-lg font-md my-5"
    //Set ID OF CONTAINER
    container.setAttribute('data-id',id);
    // add inner HTML
    title_element.innerHTML = title; 
    author_element.innerHTML = author;

    //IF READ IS FALSE MAKE ELEMENTS RED 
    if(read ==false){
        container.classList ="overflow-y-scroll my-8 mx-8 w-64 h-72 box-border shadow-xl bg-white rounded-md  px-6 py-8 ring-red-500 ring-8"
        finished_button.classList ="my-6 bg-red-300 rounded px-2"
        finished_button.innerHTML = "Not Finished"
        container.appendChild(title_element)
        container.appendChild(author_element)
        container.appendChild(finished_button)
        //return container to be appended to the library
        return container;
    }
    //MAKE ELEMENTS GREEN
    container.classList ="overflow-y-scroll my-8 mx-8 w-64 h-72 box-border shadow-xl bg-white rounded-md  px-6 py-8 ring-green-500 ring-8"
    finished_button.classList ="my-6 bg-green-300 rounded px-2"
    finished_button.innerHTML = "Finished"
    container.appendChild(title_element)
    container.appendChild(author_element)
    container.appendChild(finished_button)
    // return container to be appeneded to the library 
    return container;
}



