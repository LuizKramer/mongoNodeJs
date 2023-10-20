const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DBNAME;
const client = new MongoClient(uri);

const accountsCollection = client.db(dbName).collection('accounts');


const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbName} MongoDB database!`);
    } catch (error) {
        console.error(`Error connecting to the ${dbName} MongoDB database! ${error}`);
    }
}

const sampleAccount = {
    account_holder: "John Doe",
    account_id: "123456789",
    account_type: "Checking",
    balance: 1000,
    last_updated: new Date()
}

const main = async () => {
    try {
        await connectToDatabase();
        let result = await accountsCollection.insertOne(sampleAccount);
        console.log(`Inserted with the following id(s): ${result.insertedId}`);
    } catch (error) {
        console.error(`Error connecting to the ${dbName} MongoDB database! ${error}`);
    }
    finally {
        await client.close();
    }
}

main();