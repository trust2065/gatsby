export const getDisplayName = frontmatter => {
  const { title, date } = frontmatter
  return title !== "Diary" ? title : date
}
