const mongose = require('mongoose');

const eventSchema = new mongose.Schema({
    eventName : {
        type : String
    },
    eventDate : {
        type : Date
    }, 
    eventCode : {
        type : String
    },
    coverImage : {

    },
    description : {
        
    },
    subEvents : [
        {
            type : mongose.Schema.Types.ObjectId,
            ref : "event"
        }
    ],
    qrCode :{
        type : String
    },
    link:{
        type : String
    },
    waterMarks : [
        {
            type : String
        }
    ],
    eventAccessUsers : [
        {
            name : {
                type : String
            },
            email : {
                type : String
            }, 
            phone : {
                type : String
            },
            faceData : {
                type : String   
            },
            status : {
                type : String
            },
            sharedImagesArray : [
                {
                    type : String
                }
            ]
        }
    ],
    blockEmails : [
        {
            type : String
        }
    ],
    eventExpirationDate : {
        type : Date
    },
    dashboardId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dashboard",
    },
    owner : {
        type : String
    },
    status : {
        type : Boolean
    },
    pin :{
        type : String
    },


    // Settings
    faceSearch : {
        type : Boolean
    },
    fullEventAccess : {
        type : Boolean
    },
    eventPublished : {
        type : Boolean
    },
    allowUserToPostImages : {
        type : Boolean,
        default : false
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
})