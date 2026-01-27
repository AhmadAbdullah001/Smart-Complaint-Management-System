const mongoose = require('mongoose');
const {Schema}=mongoose;
const ComplainSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    status:{
        type:String,
        default:"Pending"
    },
    date:{
        type:Date,
        default:Date.now
    },
    resolution:{
        type:String
    }
});
module.exports=mongoose.model('complain',ComplainSchema);
