import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
decription:{
    type:String
},
website:{
    type:String
},
location:{
    type:String
},
logo:{
    type:String
},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},

},{Timestamp:true});

export const Company = mongoose.model('Company', companySchema)