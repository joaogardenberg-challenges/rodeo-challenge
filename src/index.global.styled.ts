import { createGlobalStyle } from 'styled-components'

const styled = { createGlobalStyle }

export default styled.createGlobalStyle`
  html,
  body {
    color: #333;
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  ol,
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }
`
