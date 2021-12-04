// OPEN AND CLOSE MODAL 
let ELEMENT_ID = 1000; 

const LIBRARY = document.querySelector('.library');
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
    this.id = "a"+ELEMENT_ID;
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

    if(title.trim() == "" || author.trim() == ""){
        closeModal(modal);
        return 
    }

    let book = mkObj(title,author,read);

    let element = mkElements(book);
    library.appendChild(element);
    closeModal(modal);
    resetVales();
    // CLSOE THE MODAL AFTER HITTING SUBMIT

})

//Update Read status
// const finished_buttons;


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
function mkElements(book){
    //CREATE ELEMENTS 
    const container = document.createElement('div');
    const title_element = document.createElement('div');
    const author_element = document.createElement('div');
    const finished_button = document.createElement('button');
    const delete_button = document.createElement('button'); 

    
    
    //add event listener
    finished_button.addEventListener('click',()=>{
        //TODO :: MAKE THE ACTUALLY VARIABLE CHANGE FROMT HE CLICK IN THE LIBRARY 
        if(book.read==false){
            container.classList.remove('ring-red-500')
            container.classList.add('ring-green-500')
            finished_button.classList.remove('bg-red-300')
            finished_button.classList.add('bg-green-300');
            finished_button.innerHTML = "Finished"
            book.updateRead();
            return
        }
        container.classList.remove('ring-green-500')
        container.classList.add('ring-red-500')
        finished_button.classList.remove('bg-green-300')
        finished_button.classList.add('bg-red-300');
        finished_button.innerHTML = "Not Finished"
        book.updateRead()
    })
    
    
    //add classes
    delete_button.classList="w-4 items-center text-red-600 text-md hover:bg-red-100"
    title_element.classList = "text-xl font-semibold"
    author_element.classList ="text-lg font-md my-5"
    finished_button.classList= "my-6 rounded px-2"
    container.classList="overflow-y-scroll flex flex-col my-8 mx-4 w-64 h-72 box-border shadow-xl bg-white rounded-md  px-6 py-8 ring-8"
    
    //
    //Set ID OF CONTAINER
    container.setAttribute('id',book.getId());
    finished_button.setAttribute('data-read-target',book.getId())
    delete_button.setAttribute('data-delete-target',book.getId())
    // add inner HTML
    delete_button.innerHTML = "&times"
    title_element.innerHTML = book.getTitle(); 
    author_element.innerHTML = book.getAuthor();
        // ADD EVENT LISTENER TO DELETE BUTTON 
        delete_button.addEventListener('click',()=>{
            const card_id = delete_button.dataset.deleteTarget
            card = document.getElementById(delete_button.dataset.deleteTarget);
            LIBRARY.removeChild(card);
            console.log(card_id);
            myLibrary = myLibrary.filter(function(id){
                if(id.getId() == card_id){
                    return false
                }
                return true
            })


            console.log(myLibrary)
        })
    
    //IF READ IS FALSE MAKE ELEMENTS RED 
    if(book.read ==false){
        container.classList.add("ring-red-500")
        finished_button.classList.add("bg-red-300")
        finished_button.innerHTML = "Not Finished"
        container.appendChild(delete_button);
        container.appendChild(title_element)
        container.appendChild(author_element)
        container.appendChild(finished_button)
        //return container to be appended to the library
        return container;
    }
    //MAKE ELEMENTS GREEN
    container.classList.add("ring-green-500")
    finished_button.classList.add("bg-green-300")
    finished_button.innerHTML = "Finished"
    
    
    //add chidren to whatever
    container.appendChild(delete_button);
    container.appendChild(title_element)
    container.appendChild(author_element)
    container.appendChild(finished_button)


    // return container to be appeneded to the library 
    return container;
}