import React from "react"
import { createMuiTheme, Typography } from "@material-ui/core"
import { red, blue } from "@material-ui/core/colors"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import { ThemeProvider } from "@material-ui/styles"
import Container from "../components/MyContainer"
// import Container from "@material-ui/core/Container"

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue,
    text: {
      primary: "#ff0000",
      secondary: "#9d9100",
    },
  },
})

export default () => (
  <ThemeProvider theme={theme}>
    <Container maxWidth="sm">
      <Typography>Font color can be changed by theme</Typography>
      <Button color="primary">Primary</Button>
      <Button color="secondary">secondary</Button>
      <Box color="text.primary">primary color</Box>
      <Box color="text.secondary">secondary color</Box>
    </Container>
  </ThemeProvider>
)
