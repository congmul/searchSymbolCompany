import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import NavBar from "./components/NavBar";
import CompanySymbol from "./components/CompanySymbol";


function App() {
  return (
      <Router>
        <div>
          <NavBar></NavBar>
          <div className="container">
          <Wrapper>
            <Route exact path="/" component={CompanySymbol} />
          </Wrapper>
          </div>
        </div>
      </Router>
  );
}


export default App;
