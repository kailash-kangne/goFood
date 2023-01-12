const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoURI = "mongodb+srv://goFood:goFood@cluster0.mxvxbze.mongodb.net/goFood?retryWrites=true&w=majority"

const mongoDB = async() => {
   await mongoose.connect(mongoURI, { useNewUrlParser:true }, async(err,result)=>{
    if (err) console.log('----',err);
    else {
        console.log("Connected");
        const fetched_data = await mongoose.connection.db.collection('food_items');
        fetched_data.find({}).toArray( function(err,data) {
            if (err) console.log('----',err);
            else {
                //console.log("Fetched data:",data);
            }
        })

    }



    });
}

module.exports = mongoDB;
