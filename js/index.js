
var bookName = document.getElementById('bookName')
var siteName = document.getElementById('siteName')
var search = document.getElementById('search')

var booksList = []

if( JSON.parse(localStorage.getItem("books"))!== null)
    {
        booksList = JSON.parse( localStorage.getItem("books"))
        display()
    }


function submit()
{

   
    if(validationName() && validationSite() )
        {
            var book =
    {
        name : bookName.value,
        site : siteName.value
    }

    booksList.push(book)
    localStorage.setItem("books" ,JSON.stringify(booksList))
    display()

    clear()
    Swal.fire({
        title: "Good job!",
        text: "You added the book",
        icon: "success"
      });

        }
        else
        {
            Swal.fire({
                title: "Site Name or Url is not valid, Please follow the rules below :",
                text: "Site name must contain at least 3 characters & Site URL must be a valid one", 
                icon: "warning",
               
              })
        }
    
}

function clear()
{
    bookName.value = null;
    siteName.value = null;


    bookName.classList.remove('is-valid')
    siteName.classList.remove('is-valid')
}

function display()
{
    cartona = ""

    for(var i = 0 ; i <  booksList.length ; i++ )
        {
            cartona+=
            `
            <tr>
            <td>${i + 1}</td>
            <td>${booksList[i].name}</td>
            <td><button type="button" onclick="visitSite(${i})" class="btn btn-info text-white btn-sm"> <i class="fa-solid fa-eye me-1"></i>Visit</button></td>
            <td><button type="button" onclick="deleteBook(${i})" class="btn btn-danger btn-sm"> <i class="fa-solid fa-trash-can me-1"></i>Delete</button></td>
        </tr>
            `
        }

        document.getElementById('displayBooks').innerHTML = cartona
}

function deleteBook(index)
{

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            booksList.splice(index , 1)
            localStorage.setItem("books" , JSON.stringify(booksList) )
            display()

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });

  
}

function visitSite(index)
{
    window.open(booksList[index].site, '_blank')
}


function validationName()
{
    var text = bookName.value
    var regex = /^.{3,60}$/

    if( regex.test(text) ==true)
        {
            bookName.classList.add('is-valid')
            bookName.classList.remove('is-invalid')
            return true;
        }
        else
        {
            bookName.classList.add('is-invalid')
            bookName.classList.remove('is-valid')
            return false;
        }
}

function validationSite()
{
    var text = siteName.value;
    var regex = /(https?:\/\/[^\s$.?#].[^\s]*)$/;

    if( regex.test(text) ==true)
        {
           siteName.classList.add('is-valid')
           siteName.classList.remove('is-invalid')
            return true;
        }
        else
        {
           siteName.classList.add('is-invalid')
           siteName.classList.remove('is-valid')
            return false;
        }
}

function searchBook()
{
    var term = search.value


    cartona = ""

    for(var i = 0; i <  booksList.length ; i++ )
        {

            
    if(booksList[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            
            cartona+=
            `
            <tr>
            <td>${i+1}</td>
            <td>${booksList[i].name}</td>
            <td><button type="button" onclick="visitSite(${i})" class="btn btn-info text-white btn-sm"> <i class="fa-solid fa-eye me-1"></i>Visit</button></td>
            <td><button type="button" onclick="deleteBook(${i})" class="btn btn-danger btn-sm"> <i class="fa-solid fa-trash-can me-1"></i>Delete</button></td>
        </tr>
            `
        }

        }

        document.getElementById('displayBooks').innerHTML = cartona


}