import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../index.scss"

const IndexPage = ({ data }) => {
  const {
    allMarkdownRemark: { edges: postList },
  } = data
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Let's find the most valuable stuff this week!</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <hr />
      <h2>Pages list</h2>
      <ul>
        <li>
          <Link to="/page-2/">Go to page 2</Link>
        </li>
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
      <h2>Posts list</h2>
      <ul>
        {postList.map(post => {
          const { path, title } = post.node.frontmatter
          const { id } = post.node
          return (
            <li key={id}>
              <Link to={path}>{title}</Link>
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
          }
        }
      }
    }
  }
`

export default IndexPage
