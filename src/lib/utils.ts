export function isActiveLink(
  href: string,
  currentPath: string
): boolean {
  if (href === currentPath) {
    return true
  }
  if (
    href.search('posts') > 0 &&
    (currentPath.search('posts') > 0 || currentPath.search('tag') > 0)
  ) {
    return true
  }
  if (
    href.search('snippets') > 0 &&
    currentPath.search('snippets') > 0
  ) {
    return true
  }

  return false
}

export function formatDate(date: string) {
  const currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  const targetDate = new Date(date)

  const yearsAgo =
    currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  return `Published on ${fullDate} (${formattedDate})`
}
