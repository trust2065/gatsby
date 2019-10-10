import React from "react"
import Container from "../components/MyContainer"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import styled from "styled-components"
import { Link } from "gatsby"
import { Box } from "@material-ui/core"

export default ({ data }) => {
  const { markdownRemark: post } = data
  const displayTitle =
    post.frontmatter.title !== "Diary"
      ? post.frontmatter.title
      : post.frontmatter.date

  return (
    <Container maxWidth="sm" align="left">
      <Typography variant="h3" component="h1" m={2}>
        {displayTitle}
      </Typography>
      <Typography color="textSecondary">
        <MyPaper dangerouslySetInnerHTML={{ __html: post.html }}></MyPaper>
      </Typography>
      <Box mt={2}>
        <Link to="/">Homepage</Link>
      </Box>
    </Container>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date
      }
    }
  }
`

const MyPaper = styled(Paper)`
  margin-top: 1rem;
  padding: 1rem;
`
