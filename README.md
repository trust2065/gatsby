# This is a project build with Gatsby, the goal is to build a project with GraphQL

## Document

Record learning resources and notes

<https://paper.dropbox.com/doc/learning-Gatsby--AldbnW_vKC2iQ5IuhoJAIpAsAg-90vMg0EUbYrmdGgjrqzyQ>

## Url

<https://fervent-shannon-a32890.netlify.com/>

## Run

run `yarn develop` in cmd line
then we can find website in `http://localhost:8000`
and GraphiQL tool page in `http://localhost:8000/__graphql`

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

In `index.js`, we query data and use it to create links for each page

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

In `post.js`, query data with matched path

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

Then we use fetched data, insert it as `props` into our Component

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

Solution for prevent risk of `dangerouslySetInnerHTML`
<https://www.dev.education/blog/2019/01/22/preventing-xss-vulnerabilities-in-react>

- Always sanitize the users' content that comes from forms.
- Always prefer to serialize instead of JSON.stringify.
- Use dangerouslySetInnerHTML only when absolutely necessary.
- Do unit tests for all your components, and try to cover all the possible XSS attacks that some user could do.
- Always encrypt the passwords with sha1 and md5 (together), and also add a salt value (for example, if the password is abc123, then your salt can be encrypted like this: sha1(md5('\$4lT3xt_abc123')).
- If you use cookies to store sensitive information (personal information and passwords mainly), you can save the cookie with Base64 to obfuscate the data.
- Add some protection to your APIs (using security tokens) unless you need to have a public API.
