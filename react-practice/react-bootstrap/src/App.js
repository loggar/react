import React from "react";
import "./App.css";
import {Container, Row, Col } from "react-bootstrap";

import Button1 from "./component/Button1";
import Button2Loading from "./component/Button2Loading";
import Dropdown1 from "./component/Dropdown1";
import Dropdown2 from "./component/Dropdown2";
import Dropdown3 from "./component/Dropdown3";
import Dropdown4 from "./component/Dropdown4";
import TabControlled from "./component/TabControlled";
import TabLeft from "./component/TabLeft";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Button1 />
          </Col>
          <Col>
            <Button2Loading />
          </Col>
        </Row>
        <Row>
          <Col>
            <Dropdown1 />
          </Col>
          <Col>
            <Dropdown2 />
          </Col>
          <Col>
            <Dropdown3 />
          </Col>
          <Col>
            <Dropdown4 />
          </Col>
        </Row>
      </Container>
      <Container>
        <TabControlled />
        <TabLeft />
      </Container>
    </div>
  );
}

export default App;
