import React from 'react'
import { Container, Jumbotron, Row } from 'react-bootstrap';

const styles = {
  jumbotron: {
    height: "30vh"
  }
}
function Header() {
    return (
    <Jumbotron className="m-3 p-3" style={styles.jumbotron}>
      <Container >
        <Row className="d-flex justify-content-center">
          <h1>Google Books API with React</h1>
        </Row>
        <Row className="d-flex justify-content-center">
          <p>
            Search for and Save Books
          </p>  
        </Row>
      </Container>
    </Jumbotron>
    );
  }
  
  export default Header;