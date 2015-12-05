module.exports = function(mongoose) {

    var InitiativeSchema = mongoose.Schema({
                title: String,
                content: String,
                founderId: String,
                created: Date,
				TargetFunds:Number,
				CollectedFunds: Number,
                comments: [{content: String , name:String, time: Date}],
        
    }, {collection: "cs5610.project.initiative"});

    return InitiativeSchema;
};