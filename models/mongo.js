const mongodb = require('mongodb');
const mongoose= require("mongoose");
const Schema=mongoose.Schema

const booksschema= new Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    cost:{
        type:String,
        require:true
    },
    details:{
        type:String,
        require:true
    }
})

const cartdata= new Schema({
    count:{
        type:String,
        require:true
    },
    
    details:{
        type:Object,
        require:true
    }
})

const cartbox=mongoose.model("cartdata",cartdata)
const datab=mongoose.model("datab",booksschema)
 
module.exports={ cartbox ,datab};
