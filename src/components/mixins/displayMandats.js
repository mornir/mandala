  import {
      auth
  } from '../../firebase';

  import {
      db
  } from '../../firebase';

  import Mandat from "../Mandat.vue";
  import LoginScreen from "../LoginScreen.vue";

  export const displayMandats = {
      data() {
          return {
              currentUser: {},
              mandats: [],
              isMandats: false
          };
      },
      methods: {
          newStatut(newStatut, mandat) {

              const key = mandat['.key'];
              this.$firebaseRefs.mandats.child(key).child('statut').set(newStatut);

              if (newStatut === "Liquidé") {

                  //TO DO: CREATE TIME STAMP

                  // create complete year for archiving
                  const year = "20" + mandat.code.substring(0, 2);

                  // make a copy and delete .key property, otherwise can't store in Firebase
                  const archivedMandat = mandat;
                  delete archivedMandat['.key'];
                  db.ref("mandatsLiquidés/" + year).child(key).set(archivedMandat);

                  //Quickfix for overlay, will be fixed Vuetify 0.13
                  setTimeout(() => {
                      this.$firebaseRefs.mandats.child(key).remove();
                  }, 500);
              }

          },
          saveRemarque(newRemarque, mandat) {
              const key = mandat['.key'];
              this.$firebaseRefs.mandats.child(key).child('remarque').set(newRemarque);
          }
      },
      beforeCreate() {
          auth.onAuthStateChanged((user) => {
              if (user) {
                  // User is signed in.
                  this.currentUser = user;
                  // Bind this instance's 'mandats' via vuefire.js' $bindAsArray() method
                  // last argument is called when the binding has been completed
                  this.$bindAsArray('mandats', db.ref('mandatsEnCours').orderByChild('timeStamp'), null, () => {
                      this.isMandats = true;
                  });


              } else {
                  // User is signed out.
                  this.currentUser = null;
              }
          });
      },
      components: {
          transMandat: Mandat,
          loginScreen: LoginScreen
      }
  };
