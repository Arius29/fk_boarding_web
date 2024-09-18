export const getAvatarRandom = (name: string) => {
  return `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`
}
