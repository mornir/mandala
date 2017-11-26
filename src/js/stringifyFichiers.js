export default fichiers => {
  return fichiers
    .reduce((result, item) => {
      if (item.nombre < 1) {
        return result
      }
      return result.concat(item.nombre, ' ', item.fichier, ', ')
    }, '')
    .slice(0, -2)
}
