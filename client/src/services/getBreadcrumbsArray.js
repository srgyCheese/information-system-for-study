const getBreadcrumbArray = (list, current) => {
  const categories = []

  if (!current || !list) {
    return []
  }

  let lastCategory = list.find(el => el.id === +current)
  categories.push(lastCategory)

  while (lastCategory.parent_category_id != null) {
    lastCategory = list.find(el => el.id === lastCategory.parent_category_id)
    categories.push(lastCategory)
  }

  return categories.reverse()
}

export default getBreadcrumbArray