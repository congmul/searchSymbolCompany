import React, {useState} from "react";
import Header from "../components/Header";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import API from "../utils/API";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { List } from "../components/List";
import Alert from 'react-bootstrap/Alert';

function Search() {
    // Setting our component's initial state
    const [bookSearch, setBookSearch] = useState("")
    const [bookLog, setBookLog] = useState({});
    const [alert, setAlert] = useState({
      title: "",
      display: {
        display:"none"
      }
    })
  
    const handleInputChange = event => {
        const { value } = event.target;
        setBookSearch(value);
      };
    
    const handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get books update the books state
    event.preventDefault();
    API.getGoogleBook(bookSearch)
      .then(res => {
        if(res.status === 200){
          setBookLog(res.data.items)
        } else {
          console.log(res.status);
        }
      })
      .catch(err => console.log(err));
    };

    function handleSave(key, title, subtitle, authors, description, image, link) {
        API.saveBook({
          key : key,
          title : title,
          subtitle : subtitle,
          authors : authors,
          description : description,
          image : image,
          link : link
        }).then(
          setAlert({
            title: title,
            display: {
              display: "block"
            }
          })
        )
        .catch(err => console.log(err));
    };
  
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
      <Header></Header>
        <Alert variant="success" style={alert.display}  onClose={() => (
          setAlert({
            title: "",
            display: {
              display:"none"
            }
          })
        )}
        dismissible>
          <p>{alert.title} has been saved!</p>
        </Alert>
          <Card className="m-3 p-3">
            <h3>Book Search</h3>
          <Form>
              <Form.Group controlId="query" value={bookSearch} onChange={handleInputChange}>
                  <Form.Label>Book:</Form.Label>
                  <Form.Control placeholder="Harry Potter" />
                  <Button className="btn-dark col-3 float-right mt-3 mb-3" onClick={handleFormSubmit}>Search</Button>
              </Form.Group>
          </Form>
          
          </Card>

          <Card className="m-3 p-3">
            <h3>Results:</h3>
        {!bookLog.length ? (
              <h1 className="text-center">No Books to Display</h1>
            ) : (
          <List>
          {bookLog.map(book => {
            let id = "";
            if(book.id === undefined){
              id = Math.floor(Math.random()*10000);
            } else {
              id = book.id;
            }
            let title = "";
            if(book.volumeInfo.title === undefined){
              title = "No Title";
            } else {
              title = book.volumeInfo.title;
            }
            let subtitle = "";
            if(book.volumeInfo.subtitle === undefined){
              subtitle = "";
            } else {
              title = book.volumeInfo.subtitle;
            }
            let authors = [];
            if(book.volumeInfo.authors === undefined){
              authors = ["No Author"];
            } else {
              authors = book.volumeInfo.authors;
            }
            let description = "";
            if (book.volumeInfo.description){
              description = book.volumeInfo.description;
            } else {
              description = "No description.";
            }
            let image = "";
            if(book.volumeInfo.imageLinks === undefined){
              image = "https://placehold.it/128x128";
            } else { 
              image = book.volumeInfo.imageLinks.thumbnail;
            }
            let link = "";
            if(book.volumeInfo.infoLink){
              link = book.volumeInfo.infoLink
            } else { 
              link = ""
            }
              return (
                <li className="list-group-item" key={book.id}>
                    <Container style={styles.container} >
                      <Row  className="mt-3 mb-3">
                        <Col className="col-lg-4 overflow-auto" >
                          <h3>{title}</h3>
                          <h6>{subtitle}</h6>
                          <p>Written By: {authors.join(", ")}</p>
                        </Col>
                        <Col md={{ span: 4, offset: 6 }} className="col-lg-2">
                          <a className="btn btn-dark" href={link} target="_blank" rel="noopener noreferrer">View</a>
                          <Button className="btn-success ml-3" onClick={() => handleSave(id, title, subtitle, authors, description, image, link)}>Save</Button>
                        </Col>
                        </Row>
                        <Row>
                        <Col className="col-lg-4">
                          <img src={image} alt={title} />
                        </Col>
                        <Col className="col-lg-8 overflow-auto" style={styles.description} >
                          <p>{description}</p>
                        </Col>
                      </Row>
                    </Container>
                  </li>
              );
            })} 
          </List>
            )}
        </Card>
    </div>
  );
}

export default Search;
