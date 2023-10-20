const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DBNAME;
const client = new MongoClient(uri);


const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbName} MongoDB database!`);
    } catch (error) {
        console.error(`Error connecting to the ${dbName} MongoDB database! ${error}`);
    }
}

const main = async () => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error(`Error connecting to the ${dbName} MongoDB database! ${error}`);
    }
    finally {
        await client.close();
    }
}

main();