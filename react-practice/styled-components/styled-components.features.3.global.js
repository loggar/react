// Global styling

/*
// globalStyles.js

export default createGlobalStyle`
    html {
        margin: 0;
    }

    body {
        margin: 0;
    }
`
*/

import GlobalStyle from "./globalStyles"

function App() {
    return (
        <GlobalStyle />
        <AppTree />
    )
}