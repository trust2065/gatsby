import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../index.scss"
import { getDisplayName } from "../functions"

const IndexPage = ({ data }) => {
  const {
    allMarkdownRemark: { edges: postList },
  } = data
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>This branch record dairies and demonstrate techniques</p>
      <hr />
      <h2>Demonstrate styling method with materialUI</h2>
      <ul>
        <li>
          <Link to="/styling_useStyles/">styling with useStyles demo</Link>
        </li>
        <li>
          <Link to="/styling_createMuiTheme/">
            styling with createMuiTheme demo
          </Link>
        </li>
        <li>
          <Link to="/styling_createMuiTheme_BoxTextColor/">
            styling with createMuiTheme, styling Box text-color demo
          </Link>
        </li>
      </ul>
      <hr />
      <h2>Diary</h2>
      <ul>
        {postList.map(post => {
          const { path } = post.node.frontmatter
          const displayTitle = getDisplayName(post.node.frontmatter)
          const { id } = post.node
          return (
            <li key={id}>
              <Link to={path}>{displayTitle}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            date
          }
        }
      }
    }
  }
`

export default IndexPage
