const MongoClient = require("mongodb");
const url = 'mongodb://localhost:27017/';

// Database name
const databasename = "GFG";

MongoClient.connect(url).then((client) => {
    const connect = client.db(databasename)
    connect.listCollections().toArray(function (err, names) {
        if (!err) {
            console.log(names)
        }
    });
}).catch((err) => {

    // Printing the error message
    console.log(err.Message);
})
