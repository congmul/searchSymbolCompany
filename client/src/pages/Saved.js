import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import API from "../utils/API";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { List } from "../components/List";
import Alert from 'react-bootstrap/Alert';

function Saved() {
   // Setting our component's initial state
   const [books, setBooks] = useState([])
   const [alert, setAlert] = useState({
    title: "",
    display: {
      display:"none"
    }
  })
 
   // Load all books and store them with setBooks
   useEffect(() => {
     loadBooks()
   }, [])
 
   // Loads all books and sets them to books
   function loadBooks() {
     console.log("Loading books");
     API.getBooks()
       .then(res => 
         setBooks(res.data)
       )
       .catch(err => console.log(err));
   };

   // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id, title) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .then(
        setAlert({
          title: title,
          display: {
            display: "block"
          }
        })
      )
      .catch(err => console.log(err));
  }
  
  const styles = {
    container: {
      height: "50vh"
    },
    description: {
      height: "20vh"
    }
    
  }
 
  return (
    <div>
        <Header />
        <Alert variant="danger" style={alert.display}  onClose={() => (
          setAlert({
            title: "",
            display: {
              display:"none"
            }
          })
        )}
        dismissible>
          <p>{alert.title} has been deleted!</p>
        </Alert>
          <Card className="m-3 p-3" >
            <h3 className="mb-3">Saved Books:</h3>
          {books.length ? (
              <List>
                {books.map(book => {
                  return (
                    <li className="list-group-item" key={book.key}>
                    <Container style={styles.container} >
                      <Row  className="mt-3 mb-3">
                        <Col className="col-lg-4 overflow-auto" >
                          <h3>{book.title}</h3>
                          <h6>{book.subtitle}</h6>
                          <p>Written By: {book.authors.join(", ")}</p>
                        </Col>
                        <Col md={{ span: 4, offset: 6 }} className="col-lg-2">
                          <a className="btn btn-dark" href={book.link} target="_blank" rel="noopener noreferrer">View</a>
                          <Button className="btn-danger ml-3" onClick={() => deleteBook(book._id, book.title)}>Delete</Button>
                        </Col>
                        </Row>
                        <Row>
                        <Col className="col-lg-4">
                          <img src={book.image} alt={book.title} />
                        </Col>
                        <Col className="col-lg-8 overflow-auto" style={styles.description} >
                          <p>{book.description}</p>
                        </Col>
                      </Row>
                    </Container>
                  </li>
                  
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Card>
    </div>
  );
}

export default Saved;