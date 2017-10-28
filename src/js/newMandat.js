export default {
  code: '',
  nom: '',
  arrivée: new Date().toISOString().substr(0, 10),
  délai: new Date().toISOString().substr(0, 10),
  chargeTravail: 4,
  fichiers: [
    {
      nombre: 1,
      fichier: 'Word'
    },
    {
      nombre: 0,
      fichier: 'Excel'
    },
    {
      nombre: 0,
      fichier: 'PPT'
    },
    {
      nombre: 0,
      fichier: 'PDF'
    }
  ],
  type: 'REDAC',
  activité: 'Traduction',
  TAO: 'Oui',
  source: 'DE',
  cible: 'FR',
  traducteur: '',
  réviseur: 'Carine',
  heure: '00:00',
  priorité: false,
  mandant: {},
  département: '',
  public_cible: '',
  centre_coûts: 'VKF',
  remarque: '',
  statut: 'Traduction',
  timeStamp: 0,
  questions: false
}
