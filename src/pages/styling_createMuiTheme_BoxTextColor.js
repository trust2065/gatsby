import React from "react"
import { createMuiTheme, Typography } from "@material-ui/core"
import { red, blue } from "@material-ui/core/colors"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import { ThemeProvider } from "@material-ui/styles"
import Container from "../components/MyContainer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
// import ListItemIcon from "@material-ui/core/ListItemIcon"
// import FlashOnOutlinedIcon from "@material-ui/icons/FlashOnOutlined"

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

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

export default () => {
  const baseUrl = "https://material-ui.com"
  const linkInfo = [
    { url: "/system/borders/#api", display: "borders" },
    { url: "/system/display/#api", display: "display" },
    { url: "/system/flexbox/#api", display: "flexbox" },
    { url: "/system/palette/#api", display: "palette" },
    { url: "/system/positions/#api", display: "positions" },
    { url: "/system/shadows/#api", display: "shadows" },
    { url: "/system/sizing/#api", display: "sizing" },
    { url: "/system/spacing/#api", display: "spacing" },
    { url: "/system/typography/#api", display: "typography" },
  ]
  const links = linkInfo.map(link => (
    <ListItemLink href={`${baseUrl}${link.url}`} target="__blank">
      {/* <ListItemIcon>
        <FlashOnOutlinedIcon />
      </ListItemIcon> */}
      <ListItemText primary={link.display} />
    </ListItemLink>
  ))
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box my={2}>
          <Typography variant="h3" component="h1">
            Font color can be changed by theme
          </Typography>
        </Box>
        <Typography>Buttons</Typography>
        <Button color="primary">Primary</Button>
        <Button color="secondary">secondary</Button>
        <Divider />
        <Box my={2}>
          <Typography>Boxes</Typography>
          <Box color="text.primary">primary color</Box>
          <Box color="text.secondary">secondary color</Box>
        </Box>
        <Divider />
        <Box my={2}>
          <a
            href="https://material-ui.com/system/basics/#all-inclusive"
            target="__blank"
          >
            All styling options for Box
          </a>
          <List component="nav">{links}</List>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
