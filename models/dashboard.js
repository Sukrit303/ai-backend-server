var mongose = require("mongoose");  

const dashboardSchema = new mongose.Schema({
    eventArray : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "events",
        }
    ],
    plan : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "plans",
            active : Boolean,
            date : Date
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    }

})

const dashboardModel = mongose.model("user", dashboardSchema);

module.exports = dashboardModel;
