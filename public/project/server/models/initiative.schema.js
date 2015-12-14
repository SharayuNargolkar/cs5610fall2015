module.exports = function(mongoose) {

    var InitiativeSchema = mongoose.Schema({
                title: String,
                content: String,
                founder: {founderId: String, founderName: String},
                created: Date,
				targetFunds: Number,
				collectedFunds: Number,
                comments: [{content: String , name:String, time: Date}],
    }, {collection: "cs5610.project.initiative"});

    return InitiativeSchema;
};