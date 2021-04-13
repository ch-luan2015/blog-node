


async function findListings(client, resultsLimit) {
    const cursor = client
        .db('IdolDB')
        .collection('rom2')
        .find()
        .limit(resultsLimit);

    const results = await cursor.toArray();
    if (results.length > 0) {
        // results.forEach((result, i) => {
        //     date = new Date(result.last_review).toDateString();

        //     console.log();
        //     console.log(`${i + 1}. name: ${result.name}`);
        //     console.log(`   _id: ${result._id}`);
        //     console.log(result.images[i])

        // });
    }
}

async function main() {
    const MongoClient = require('mongodb').MongoClient;
    const uri1 =
        "mongodb+srv://ivanpolka:lucifer147@cluster0.5k9d4.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
    const uri2 = "mongodb+srv://Polka:lucifer147@cluster0.ljn9n.gcp.mongodb.net/IdolDB?retryWrites=true&w=majority";
    const client1 = new MongoClient(uri1, { useNewUrlParser: true });

    const client2 = new MongoClient(uri2, { useNewUrlParser: true })
    // Connect to the client and query
    await client1.connect();
    await client2.connect();
    findListings(client2, 5);
    client1.close();
    client2.close();
}
main().catch(console.error);
