import React from "react";
import {useState} from "react"
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "bootstrap/dist/css/bootstrap.min.css";

function TabControlled() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="home" title="Home">
        ABC
      </Tab>
      <Tab eventKey="profile" title="Profile">
        DEF
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        EFG
      </Tab>
    </Tabs>
  );
}

export default TabControlled;
