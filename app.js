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

const sampleAccounts = [
    {
        account_holder: "John Doe",
        account_id: "123456781",
        account_type: "Checking",
        balance: 1000,
        last_updated: new Date()
    }, {
        account_holder: "Jane Doe",
        account_id: "987654321",
        account_type: "Checking",
        balance: 1000,
        last_updated: new Date()
    }
]

const documentsToFind = {balance:{ $gte: 1000 }};

const documentToUpdate = {account_id: "123456789"};
const updatedDocument = { $inc: {balance: 2000}};


const main = async () => {
    try {
        await connectToDatabase();
        // let result = await accountsCollection.insertOne(sampleAccount);
        // console.log(`Inserted with the following id(s): ${result.insertedId}`);

        // let result = await accountsCollection.insertMany(sampleAccounts);
        // console.log(`Inserted with the following id(s): ${result.insertedIds}, ${result.insertedCount} documents inserted!`);

        // let result = await accountsCollection.find(documentsToFind);
        // let docCount = await accountsCollection.countDocuments(documentsToFind);

        // const arr = await result.toArray();
        // console.log(arr, `Found ${docCount} documents!`);

        // const result = await accountsCollection.updateOne(documentToUpdate, updatedDocument);
        // console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        // console.log(result.acknowledged);

        

    } catch (error) {
        console.error(`Error connecting to the ${dbName} MongoDB database! ${error}`);
    }
    finally {
        await client.close();
    }
}

main();