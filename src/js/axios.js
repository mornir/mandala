import axios from 'axios'
import stringifyFichiers from './stringifyFichiers'
import { db } from '../firebase'

/*https://stackoverflow.com/questions/45291983/sending-requests-to-elasticsearch-with-axios
https://stackoverflow.com/questions/46215856/tried-to-connect-to-elasticsearch-with-axios
*/

async function create(mandat, key) {
  const bonsai = await db.ref('bonsai').once('value')
  return axios({
    method: 'put',
    url: `https://first-cluster-2026533573.eu-central-1.bonsaisearch.net/mandats/mandat/${key}`,
    data: {
      code: mandat.code,
      nom: mandat.nom,
      arrivée: mandat.arrivée,
      délai: mandat.délai,
      type: mandat.type,
      activité: mandat.activité,
      TAO: mandat.TAO,
      source: mandat.source,
      cible: mandat.cible,
      traducteur: mandat.traducteur,
      réviseur: mandat.réviseur,
      heure: mandat.heure,
      priorité: mandat.priorité,
      public_cible: mandat.public_cible,
      centre_coûts: mandat.centre_coûts,
      remarque: mandat.remarque,
      département: mandat.mandant.département,
      mandant: mandat.mandant.text,
      fichiers: stringifyFichiers(mandat.fichiers)
    },
    auth: {
      username: bonsai.val().username,
      password: bonsai.val().password
    }
  })
}

async function search(query) {
  const bonsai = await db.ref('bonsai').once('value')
  const response = await axios.get(
    'https://first-cluster-2026533573.eu-central-1.bonsaisearch.net/_search',
    {
      params: {
        source: query
        // I found this online, but it doesn't seem necessary in the end:
        /* 
        source: JSON.stringify(query),
        source_content_type: 'application/json'
        */
      },
      auth: {
        username: bonsai.val().username,
        password: bonsai.val().password
      }
    }
  )
  return response.data.hits.hits
}

export { create, search }
