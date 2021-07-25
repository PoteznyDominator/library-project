const submitBtn = document.querySelector(".submit");
const parrent = document.querySelector(".main")

function book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;  
}


book.prototype.info = function(){
  if(this.read){
    return `The ${this.title} by ${this.author}, ${this.pages} pages, have been read.`;
  }
  else{
    return `The ${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
  }
}
book.prototype.createNew = function(){
    //createing a section of new added book
    const book =`<tr class="border ${this.title}" >
    <td>${this.title}</td>
    <td>${this.author}</td>
    <td>${this.pages}</td>
    <td>${this.read}</td>
    <td><button class="delete" id="${this.title}">delete</button></td>
    </tr>`;
    //function insertAdjecentHTML is used to insert specific text as html and add to parrent
    //beforeend means inside parent and as last child
    parrent.insertAdjacentHTML('beforeend', book);
    this.deleteBtn();
}
book.prototype.deleteBtn = function(){
  const deleteBtn = document.querySelector(`#${this.title}`);
    deleteBtn.addEventListener('click',()=>{
      const removeNode = document.querySelector(`.${this.title}`);
      console.log(removeNode);
      removeNode.remove();
    });
};

const inputs = document.querySelectorAll(".input");

submitBtn.addEventListener('click', ()=>{
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let status = document.querySelector("#status");
  if(title.value === "" || author.value === "" || pages.value === ""){
    alert("You need to fill all blanks")
  } else{
    let newbook = new book(title.value, author.value, pages.value, status.value);
    newbook.createNew();
    inputs.forEach(element => {
      element.value = "";
    });
  }
});

const exitedBooks = document.querySelectorAll(".border");
exitedBooks.forEach(element => {
  e = element.childNodes;
  let newbook = new book(e[1].outerText, e[3].outerText, e[5].outerText, e[7].outerText);
  newbook.deleteBtn();
});