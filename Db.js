const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    name: String,
})

const Admin = new Schema({
    email: { type: String, unique: true },
    password: String,
    name: String,
})

const Course = new Schema({
    title : String,
    description : String,
    price : Number,
    imageurl : String,
    createrId:  ObjectId,
})

const purchase = new Schema({
    userId :{
        type: ObjectId,
        ref: 'usermodel'
    },
    courseId : {
        type: ObjectId,
        ref: 'coursemodel'
    }
}) 


const userModel = mongoose.model('users', userSchema);  //users is table in DB
const adminModel = mongoose.model('admins', Admin);
const courseModel = mongoose.model('courses', Course);
const purchaseModel = mongoose.model('purchases', purchase);

module.exports ={
    userModel,
    adminModel, 
    courseModel,
    purchaseModel
};