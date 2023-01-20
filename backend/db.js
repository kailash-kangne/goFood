const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoURI = "mongodb+srv://goFood:goFood@cluster0.mxvxbze.mongodb.net/goFood?retryWrites=true&w=majority"

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log('----', err);
        else {
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection('food_items');
            fetched_data.find({}).toArray(async function (err, data) {

                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log('----',err);
                    else {
                        
                        global.food_items = data;
                        global.food_category = catData;
                        
                    }

                })
                // if (err) console.log('----',err);
                // else {
                //     //console.log("Fetched data:",data);
                //     global.food_items = data;
                //     //console.log(global.food_items);
                // }
            })

        }



    });
}

module.exports = mongoDB;
