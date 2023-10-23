const mongoose = require('mongoose');

const connectDatabase = async () => {

    try {
        await mongoose.connect("mongodb://localhost:27017/Cinema_db", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Database... ');
    } catch(e) {
        console.error(e.message);
        process.exit(1);
    }
    
}
module.exports = connectDatabase;