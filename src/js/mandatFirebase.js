import { db } from '../firebase'

import format from 'date-fns/format'

const mandatFirebase = async mandat => {
  const fullYear = format(new Date(), 'YYYY')
  const shortYear = format(new Date(), 'YY')
  const month = format(new Date(), 'MM')

  const result = await db
    .ref('compteurs')
    .child(fullYear)
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
