const functions = require('firebase-functions');
//const google = require('googleapis');
//
//const FUNCTIONS_CLIENT_ID = functions.config().googleapi.client_id;
//const FUNCTIONS_SECRET_KEY = functions.config().googleapi.client_secret;
//const FUNCTIONS_REDIRECT = '{YOUR_FUNCTIONS_SUBDOMAIN}.cloudfunctions.net/OauthCallback';
//
//const OAuth2 = google.auth.OAuth2;
//
//const oauth2Client = new OAuth2(
//    FUNCTIONS_CLIENT_ID,
//    FUNCTIONS_SECRET_KEY,
//    FUNCTIONS_REDIRECT
//);


//const admin = require('firebase-admin');

//admin.initializeApp(functions.config().firebase);


// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

exports.OauthCallback = functions.https.onRequest((req, res) => {
    response.send("Hello from Firebase!");
    //    const code = req.query.code;
    //    functionsOauthClient.getToken(code, (err, tokens) => {
    //        // Now tokens contains an access_token and an optional refresh_token. Save them.
    //        if (err) {
    //            return res.status(400).send(err);
    //        }
    //        return db.ref(DB_TOKEN_PATH).set(tokens).then(() => res.status(200).send('OK'));
    //    });
});
