const functions = require('firebase-functions');
const google = require('googleapis');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const db = admin.database();

const FUNCTIONS_CLIENT_ID = functions.config().googleapi.client_id;
const FUNCTIONS_SECRET_KEY = functions.config().googleapi.client_secret;
const FUNCTIONS_REDIRECT = 'https://us-central1-transhub-24008.cloudfunctions.net/OauthCallback';



const OAuth2 = google.auth.OAuth2;

const functionsOauthClient = new OAuth2(
    FUNCTIONS_CLIENT_ID,
    FUNCTIONS_SECRET_KEY,
    FUNCTIONS_REDIRECT
);

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

exports.authGoogleAPI = functions.https.onRequest((req, res) =>
    res.redirect(functionsOauthClient.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    }))
);



//express/node --> see udemy course to understand
const DB_TOKEN_PATH = '/api_tokens';
exports.OauthCallback = functions.https.onRequest((request, respond) => {

    const code = request.query.code;
    functionsOauthClient.getToken(code, (err, tokens) => {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (err) {
            return respond.status(400).send(err);
        }
        return db.ref(DB_TOKEN_PATH).set(tokens).then(() => respond.status(200).send('OK'));
    });
});


let oauthTokens = null;

// checks if oauthTokens have been loaded into memory, and if not, retrieves them
function getAuthorizedClient() {
    return new Promise((resolve, reject) => {
        if (oauthTokens) {
            return resolve(functionsOauthClient);
        }
        db.ref(DB_TOKEN_PATH).once('value').then((snapshot) => {
            oauthTokens = snapshot.val();
            functionsOauthClient.setCredentials(oauthTokens);
            return resolve(functionsOauthClient);
        }).catch(() => reject());
    });
}

// accepts an append request, returns a Promise to append it, enriching it with auth
function appendPromise(requestWithoutAuth) {
    return new Promise((resolve, reject) => {
        getAuthorizedClient().then((client) => {
            const sheets = google.sheets('v4');
            const request = requestWithoutAuth;
            request.auth = client;
            sheets.spreadsheets.values.append(request, (err, response) => {
                if (err) {
                    console.log(`The API returned an error: ${err}`);
                    return reject();
                }
                return resolve(response);
            });
        }).catch(() => reject());
    });
}

const SHEET_ID = '1gZLi7dKThTR3mfsJ3CPnZck1mmsK2WT_osrUse53EW8'; // (long string in middle of Sheet URL)
const DATA_PATH = '/mandatsEnCours';


// trigger function to write to Sheet when new data comes in on DATA_PATH
// {item} is a variable containing the key name, accessible through event.params.VARIABLE
exports.appendRecordToSpreadsheet = functions.database
    .ref(`${DATA_PATH}/{ITEM}`)
    .onWrite(
        (event) => {

            // Only edit data when it is first created.
            if (event.data.previous.exists()) {
                return;
            }
            // Exit when the data is deleted.
            // I think I don't need this
            //      if (!event.data.exists()) {
            //        return;
            //      }

            const newRecord = event.data.current.val();
            // return a promise containing the updated speadsheet data (ID, range, new data, etc.)
            // here we actually don't process the `response` object
            // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
            // but I still leave the return object since it was in the orginal example
            return appendPromise({
                spreadsheetId: SHEET_ID,
                range: 'A:C',
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [[newRecord.code, newRecord.arrivée, newRecord.nom]]
                }
            });
        });


// HTTPS function to write new data to DATA_PATH, for testing
//exports.testSheetWrite = functions.https.onRequest((req, res) => {
//    const random1 = Math.floor(Math.random() * 100);
//    const random2 = Math.floor(Math.random() * 100);
//    const random3 = Math.floor(Math.random() * 100);
//    const ID = new Date().getUTCMilliseconds();
//    return db.ref(`${DATA_PATH}/${ID}`).set({
//        firstColumn: random1,
//        secondColumn: random2,
//        thirdColumn: random3
//    }).then(() => res.status(200).send(
//        `Wrote ${random1}, ${random2}, ${random3} to DB, trigger should now update Sheet.`));
//});
