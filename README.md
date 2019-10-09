# Document

<https://paper.dropbox.com/doc/learning-Gatsby--AldbnW_vKC2iQ5IuhoJAIpAsAg-90vMg0EUbYrmdGgjrqzyQ>

This is a project build with Gatsby, the goal is to build a project with GraphQL

## Run

`yarn develop`

## GraphQL

In `gatsby-node.js`, we query data and creating pages with it

```javascript
graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            date
          }
        }
      }
    }
  }
`).then(res => {
  if (res.errors) {
    return Promise.reject(res.errors)
  }

  res.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: postTemplate,
    })
  })
})
```

In `index.js`, we query data and use it to create links for each pages

```javascript
graphql`
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
```

In `post.js`, query data with GraphQL code below

```javascript
graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
```

Then we use fetched data, insert as `props` into our `component`

```javascript
export ({ data }) => {
  const { markdownRemark: post } = data
  const getPost = () => {return {__html: post.html}}
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ getPost() }}></div>
    </div>
  )
}
```

### Dangerously set innerHTML

In order to prevent XSS(cross-site scripting) attack, React treats any `state/prop` as normal string and won't translate it to html.
But a developer who knows setting html directly is risky, and would like perform that result, we can use `dangerouslySetInnerHTML`, force parsing string to `html`

Examples of XSS attack

```javascript

// case 1: script tag in input field
<input type="text" value=""><script>alert('XSS');</script>"></input>

//  case 2: javascript:alert('xss') in href attribute of <a> tag
<a href="javascript:alert('XSS')">Redirect...</a>

```
