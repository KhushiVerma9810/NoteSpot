const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}

module.exports = connectToMongo;
