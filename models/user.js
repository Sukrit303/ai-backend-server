var mongose = require("mongoose");  

const userSchema = new mongose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    mobile : {
        type : String
    },
    password : {
        type : String
    },
    dashboardId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dashboard",
    },
    usersArray : [
        {
            name : { 
                type : String,
            },
            email : {
                type : String
            },
            role : {
                type : String
            }, 
            password : {
                type : String
            }
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    }

})

const userModel = mongose.model("user", userSchema);

module.exports = userModel;
