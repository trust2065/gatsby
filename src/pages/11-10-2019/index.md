---
path: "/11-10-2019"
title: "GatsBy knowledge"
published: true
date: "11-10-2019"
---

## About GatsBy

### Link

<https://www.gatsbyjs.org/docs/gatsby-link/#use-link-only-for-internal-links>

- `<Link>` provide by gatsby is only suitable for internal links
  - provide "preloading" feature. It pre-fetch resources
- For external links, use `<a>`

#### Choose \<Link> or \<a> programmatically

When you can't decide a link is a external / an internal link, try the following approach

```javascript
import { Link as GatsbyLink } from "gatsby"
// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

export default Link
```
