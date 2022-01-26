const addBookBtn=document.querySelector('.add-button')
const addForm=document.querySelector('.addform')
const readSwitch=document.querySelector(".switch")
const bookForm=document.querySelector('.form')
const cancelBook=document.querySelector('.cancel')
const form=document.querySelector('.form')
const inputFieldTitle=document.querySelector('.title input')
const inputFieldAuthor=document.querySelector('.author input')
const inputFieldPages=document.querySelector('.pages input')
const read=document.querySelector('.read')
const addBook=document.querySelector('.add-book')
const bookShelf=document.querySelector('.bookshelf')
const comicType=document.querySelector('.comic')
const normalType=document.querySelector('.normal');
let book
let type="normal"
let readStatus="unread"
let inputField=document.querySelectorAll('input')
let i=0

inputField.forEach(field =>{
    let value=field.value
    field.addEventListener('click', ()=>{
        if (value==field.value){
        field.value=""
        }
        })
})
addBookBtn.addEventListener('click', ()=>{
    addForm.classList.remove('hidden')
})
cancelBook.addEventListener('click', ()=>{
    clearForm()
})

addBookBtn.addEventListener('mouseover', ()=>{
    addBookBtn.style.backgroundColor="greenyellow"
    addBookBtn.style.color="black"
})
addBookBtn.addEventListener('mouseout', ()=>{
    addBookBtn.style.backgroundColor=""
    addBookBtn.style.color="greenyellow"
})
///////////////effects\\\\\\\\\\\\\\
cancelBook.addEventListener('mouseover', ()=>{
    cancelBook.style.color="red"
})
cancelBook.addEventListener('mouseout', ()=>{
    cancelBook.style.color="#a7c230"
})
addBook.addEventListener('mouseover',()=>{
    addBook.style.color='#00ff80'
})
addBook.addEventListener('mouseout',()=>{
    addBook.style.color='red'
})
///////////////////////////////


//////////////ADD BOOK\\\\\\\\\\\\\\\\\\

addBook.addEventListener('click', ()=>{
    title=inputFieldTitle.value
    author=inputFieldAuthor.value
    pages=inputFieldPages.value
    book= new Book(title,author,pages,readStatus,type)
    clearForm()
    addBookToLibrary()
})
///////////////////******\\\\\\\\\\\\\\\
comicType.addEventListener('click', () =>{
    type='comic'
    comicType.style.color="red"
    normalType.style.color='black'
})
normalType.addEventListener('click', ()=>{
    type='normal'
    comicType.style.color='black'
    normalType.style.color='burlywood'
})

readSwitch.addEventListener('change', e =>{ //read or unread
    if(e.target.checked){//read
       readStatus="read"
       bookForm.style.boxShadow="0 0 30px #00ff80"
       read.style.color="#00ff80"
       console.log(readStatus)
    }
    else if(e.target){ //unread
        readStatus="unread"
        bookForm.style.boxShadow="0 0 30px rgb(247, 83, 83)"
        read.style.color="rgb(247, 83, 83)"
    }
})

/////////////////////*******Functions Here******\\\\\\\\\\\\\\\\\\\\\\\\\
function clearForm(){
    inputFieldAuthor.value="Who's the Author?" 
    inputFieldTitle.value="What's the Book's Title?"
    inputFieldPages.value="Pages"
    comicType.style.color='black'
    normalType.style.color='black'
    document.querySelector('.switch input').checked=false
    readStatus="unread"
    bookForm.style.boxShadow="0 0 30px rgb(247, 83, 83)"
    read.style.color="rgb(247, 83, 83)"
    addForm.classList.add('hidden')  
}

///////// ADD-REMOVE AND DISPLAY BOOKS\\\\\\\\\\\\
let myLibrary = [];


function Book(title,author,pages,readStatus,type){
    this.title= title
    this.auth= author
    this.pages= pages 
    this.readStat= readStatus
    this.bookType=type
}

function addBookToLibrary(){
    myLibrary.push(book)
    displayBooks()
}

function displayBooks(){
    length=myLibrary.length
    let bookDis
   for(i;i<length;i++){
       bookDis=myLibrary[i]
       const bookTitle=bookDis.title
       const bookAuthor=bookDis.auth
       const bookPages=bookDis.pages
       const bookRead=bookDis.readStat
       const coverType=bookDis.bookType

       const newBook=document.createElement('div')
       newBook.className='book'
       const top=document.createElement('div')
       top.className='book-top'
       const center=document.createElement('div')
       center.className='book-center'
       const bottom=document.createElement('div')
       bottom.className='book-bottom'

       const newTitle=document.createElement('div')
       newTitle.className='book-title'
       newTitle.textContent=bookTitle
       const newAuthor=document.createElement('div')
       newAuthor.className='book-author'
       newAuthor.textContent="- "+bookAuthor.toUpperCase()
       const pagesDisplay=document.createElement('div')
       pagesDisplay.className='book-pages'
       pagesDisplay.textContent=bookPages
       
       //readSwitch, yup it's a pain in the a$$
       const bRS=document.createElement('div') //bRS= bookReadSelector
       bRS.className='book-read'
       bRS.textContent=bookRead
       bRS.style.cursor="pointer"
       
       const removeBtn=document.createElement('div')
       removeBtn.className='book-remove'
       removeBtn.textContent='Remove'
       removeBtn.style.color='red'
       removeBtn.style.padding='5px'
       bottom.appendChild(removeBtn)
       bottom.appendChild(pagesDisplay)


       if(coverType=="comic"){
           pagesDisplay.textContent=pages+" pgs"
           newBook.style.backgroundImage="url(./media/comic-cover.png)"
           newAuthor.style.fontFamily="comicFont"
           newTitle.style.fontFamily="comicFont"
           pagesDisplay.style.fontFamily="comicFont"
           newAuthor.style.textAlign="right"
           pagesDisplay.style.textAlign="right"
           top.style.marginTop="130px"
           center.style.marginTop="5px"
           top.appendChild(newTitle)
           top.appendChild(newAuthor)
           top.appendChild(pagesDisplay)
           bottom.style.backgroundColor="rgba(0, 0, 0, 0.521)"
           
       }
       if(coverType=="normal"){
        newBook.style.backgroundImage="url(./media/normal-cover.png)"
        top.style.fontFamily='Sedgwick Ave'
        top.style.fontSize="18px"
        top.appendChild(newTitle)
        top.appendChild(newAuthor)
        top.style.textAlign="right"
        top.style.marginTop="25px"

        center.style.marginTop="60px"

        bottom.style.marginTop="65px"
        bottom.style.marginLeft="45px"
        pagesDisplay.style.marginLeft="35px"
        bottom.appendChild(pagesDisplay)
        bottom.style.display='flex'
        bottom.style.width='60%'
        bottom.style.justifyContent="space-between"
        bottom.style.alignItems="center"
       }

       center.appendChild(bRS)
       newBook.appendChild(top)
       newBook.appendChild(center)
       newBook.appendChild(bottom)

       bookShelf.appendChild(newBook)

       if(bookRead=="read"){
        newBook.style.boxShadow="0 0 30px #00ff80"
        bRS.style.color="#00ff80"
    }
    else if(bookRead=="unread"){
        newBook.style.boxShadow="0 0 30px rgb(247, 83, 83)"
        bRS.style.color="rgb(247, 83, 83)"
    }
   }
   removeBookButton()
}

displayBooks()


function removeBookButton(){
let bookTODelete
let index
let books=document.querySelectorAll('.book')
let button=document.querySelectorAll('.book-remove')
books.forEach(book =>{
     bookTODelete=book.title
     index=myLibrary.indexOf(bookTODelete)
    book.addEventListener('mouseover',()=>{
        button.forEach(button =>{
            button.addEventListener('mouseover', ()=>{
                button.style.color="black"
            })
            button.addEventListener('mouseout', ()=>{
                button.style.color="red"
            })
            button.addEventListener('click', ()=>{
                removeBook(index)
            })
        
        })
    })

})
}

function removeBook(index){
    myLibrary.splice(index, 1)
    console.log(myLibrary)
}

