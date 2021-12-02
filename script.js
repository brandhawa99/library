// OPEN AND CLOSE MODAL 
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

}
Book.prototype.updateRead = function(){
    this.read = !this.read;
}

