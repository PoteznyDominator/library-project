const submitBtn = document.querySelector(".submit");
const parrent = document.querySelector(".main")
let bookArray = [];

function book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;  
}

book.prototype.createNew = function(){
  //createing a section of new added book
  const book =`<tr class="border ${this.title}" >
  <td>${this.title}</td>
  <td>${this.author}</td>
  <td>${this.pages}</td>
  <td><button class="statusBtn ${this.title}Btn">${this.read}</button></td>
  <td><button class="delete" id="${this.title}">Delete</button></td>
  </tr>`;
  //function insertAdjecentHTML is used to insert specific text as html and add to parrent
  //beforeend means inside parent and as last child
  parrent.insertAdjacentHTML('beforeend', book);
  this.deleteBtn();
  this.statusBtn();
  bookArray.push(this.title.toLowerCase());
  localStorage.setItem(this.title, JSON.stringify(this));
}
book.prototype.deleteBtn = function(){
  const deleteBtn = document.querySelector(`#${this.title}`);
    deleteBtn.addEventListener('click',()=>{
      if(confirm("Are you sure you want to delete this?")){
        const removeNode = document.querySelector(`.${this.title}`);
        removeNode.remove();
        localStorage.removeItem(this.title);
        bookArray.pop(this.title.toLowerCase());
      }
    });
};
book.prototype.statusBtn = function(){
  const statusBtn = document.querySelector(`.${this.title}Btn`);
  //checking first state of button and if needed replace.
  if(this.read === "notRead"){
    statusBtn.innerHTML = "Not Read";
    statusBtn.style.color = "#e00000";
  }
  statusBtn.addEventListener('click', ()=>{
    if(this.read === "read"){
      statusBtn.style.color = "#e00000";
      this.read = "notRead"
      statusBtn.innerHTML = "Not Read"
    }
    else{
      statusBtn.style.color = "#169b26";
      this.read = "read"
      statusBtn.innerHTML = "Read"
    }
    localStorage.setItem(this.title, JSON.stringify(this));
  });
}

const inputs = document.querySelectorAll(".input");

submitBtn.addEventListener('click', ()=>{
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let status = document.querySelector("#status");
  if(title.value === "" || author.value === "" || pages.value === ""){
    alert("You need to fill all blanks.")
  } 
  else if(isNaN(parseInt(pages.value))){
    alert("Pages must be an integer.")
  } 
  else if(bookArray.includes(title.value.toLowerCase())){
    alert(`"${title.value}" already exist.`);
    inputs.forEach(element => {
      element.value.capitalize = "";
    });
  } 
  else{
    let newbook = new book(title.value, author.value, pages.value, status.value);
    newbook.createNew();
    inputs.forEach(element => {
      element.value = "";
    });
  }
});

//showing local storage
window.addEventListener('load',()=>{
  for(let i = 0; i < localStorage.length; i++){
    element = JSON.parse(localStorage.getItem(localStorage.key(i)));
    newbook = new book(element.title, element.author, element.pages, element.read);
    newbook.createNew();
  } 
});