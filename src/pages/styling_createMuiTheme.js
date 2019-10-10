import React from "react"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import { purple } from "@material-ui/core/colors"
import Button from "@material-ui/core/Button"
import Container from "../components/MyContainer"

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: "#11cb5f" }, // This is just green.A700 as hex.
  },
})

// console.log(JSON.stringify(theme))

export default function Palette() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
      </Container>
    </ThemeProvider>
  )
}
