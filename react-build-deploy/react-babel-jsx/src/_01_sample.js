const React = require("react");
const ReactDOM = require("react-dom");
const dom = ReactDOM.createElement;

var user = {
    firstName : "Charly",
    lastName : "LEE"
};

var profile = <div>
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;