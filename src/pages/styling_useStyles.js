import React from "react"
import Container from "@material-ui/core/Container"
import { ThemeProvider, makeStyles } from "@material-ui/styles"
import styled from "styled-components"

const theme = {
  background: "white",
}

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.background,
  },
}))

const MyContainerWithStyle = props => {
  const classes = useStyles()

  return (
    <MyContainer {...props} className={classes.root}>
      {props.children}
    </MyContainer>
  )
}

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <MyContainerWithStyle maxWidth="sm">Test</MyContainerWithStyle>
    </ThemeProvider>
  )
}

const MyContainer = styled(Container)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`
