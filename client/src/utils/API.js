import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(postData) {
    return axios.post("/api/books", postData);
  },
  getGoogleBook: function(title){
      return axios.get("https://www.googleapis.com/books/v1/volumes?q="+title);
  },  
  // Gets all symbols
  getSymbols: function() {
    return axios.get("/api/symbols");
  },
};
