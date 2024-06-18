const mongoose = require('mongoose');

async function dbConnect(url) {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB :)');
    }
    catch (err) {
        console.log("MongoDB connection error: ", err);
    }   
}

module.exports = { 
    dbConnect
};