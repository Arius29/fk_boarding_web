export const getInitials = (name: string) => {
  const names = name.split(' ')
  return names.length > 1 ? names[0][0] + names[1][0] : names[0][0]
}

export const getAvatarColor = (name: string) => {
  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F1C40F',
    '#E67E22',
    '#7639bf',
    '#cc74a5',
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}
