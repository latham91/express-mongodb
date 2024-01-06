const mongoose = require("mongoose");

const dbConnect = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${connect.connection.host}`.cyan.underline.bold);
};

module.exports = dbConnect;
