require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const URL = process.env.DB_CONNECTION_STRING || ''
const VERSION = process.env.ANDROID_APP_VERSION || ''

MongoClient.connect(URL, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db("grocery");
    dbo.collection("appDetails").updateOne({}, {
        $set: {
            latestAndroidVersion: VERSION
        }
    }, function (err, result) {
        if (err) throw err;
        console.log("Android version updated in DB.");
        db.close();
    });
});