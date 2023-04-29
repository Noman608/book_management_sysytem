document.addEventListener("DOMContentLoaded", function () {
    const deleteLinks = document.querySelectorAll("a[data-delete]");
 
    deleteLinks.forEach((link) => {
       link.addEventListener("click", (event) => {
          event.preventDefault();
 
          const confirmation = confirm("Are you sure you want to delete this book?");
 
          if (confirmation) {
             const id = link.getAttribute("data-delete");
             deleteBook(id, link);
          }
       });
    });
 });
 
 function deleteBook(id, link) {
    const xhr = new XMLHttpRequest();
 
    xhr.open("DELETE", `/delete/${id}`, true);
 
    xhr.onload = function () {
       if (xhr.status === 200) {
          const row = link.parentElement.parentElement;
          row.remove();
       } else {
          console.error("An error occurred while deleting the book.");
       }
    };
 
    xhr.send();
 }
 