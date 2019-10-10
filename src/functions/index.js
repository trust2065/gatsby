export const getDisplayName = post => {
  const { title, date } = post.node.frontmatter
  return title !== "Diary" ? title : date
}
