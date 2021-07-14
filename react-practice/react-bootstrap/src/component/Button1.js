import React from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import "bootstrap/dist/css/bootstrap.min.css";

function Button1() {
  return (
    <div className="Button1">
      <ButtonToolbar>
        <Button variant="primary">Primary</Button>{" "}
        <Button variant="secondary">Secondary</Button>{" "}
        <Button variant="success">Success</Button>{" "}
        <Button variant="warning">Warning</Button>{" "}
        <Button variant="danger">Danger</Button>{" "}
        <Button variant="info">Info</Button>{" "}
        <Button variant="light">Light</Button>{" "}
        <Button variant="dark">Dark</Button>{" "}
        <Button variant="link">Link</Button>
      </ButtonToolbar>
      <ButtonToolbar>
        <>
          <Button variant="outline-primary">Primary</Button>{" "}
          <Button variant="outline-secondary">Secondary</Button>{" "}
          <Button variant="outline-success">Success</Button>{" "}
          <Button variant="outline-warning">Warning</Button>{" "}
          <Button variant="outline-danger">Danger</Button>{" "}
          <Button variant="outline-info">Info</Button>{" "}
          <Button variant="outline-light">Light</Button>{" "}
          <Button variant="outline-dark">Dark</Button>
        </>
      </ButtonToolbar>
      <ButtonToolbar>
        <>
          <div className="mb-2">
            <Button variant="primary" size="lg">
              Large button
            </Button>{" "}
            <Button variant="secondary" size="lg">
              Large button
            </Button>
          </div>
          <div>
            <Button variant="primary" size="sm">
              Small button
            </Button>{" "}
            <Button variant="secondary" size="sm">
              Small button
            </Button>
          </div>
        </>
      </ButtonToolbar>
      <ButtonToolbar>
        <>
          <Button variant="primary" size="lg" active>
            Primary button
          </Button>{" "}
          <Button variant="secondary" size="lg" active>
            Button
          </Button>
        </>
      </ButtonToolbar>
      <ButtonToolbar>
        <>
          <Button variant="primary" size="lg" disabled>
            Primary button
          </Button>{" "}
          <Button variant="secondary" size="lg" disabled>
            Button
          </Button>{" "}
          <Button href="#" variant="secondary" size="lg" disabled>
            Link
          </Button>
        </>
      </ButtonToolbar>
    </div>
  );
}

export default Button1;
