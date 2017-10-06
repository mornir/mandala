import { db } from '../firebase'

const mandatFirebase = async () => {
  const year = new Date().getFullYear()
  const shortYear = year.toString().substr(2, 2)
  const month = new Date().getMonth() + 1
  let mandat = {}

  const result = await db
    .ref('compteurs')
    .child(year)
    .child(month)
    .transaction(currentValue => {
      return (currentValue || 0) + 1
    })

  const number = ('00' + result.snapshot.val()).slice(-3)

  mandat.code = `${shortYear}.${month}.${number}`

  // dot caracter is not accepted as a key
  const cleanCode = mandat.code.replace(/\./g, '_')

  return db
    .ref('mandatsEnCours')
    .child(cleanCode)
    .set(mandat)
}

export { mandatFirebase }
