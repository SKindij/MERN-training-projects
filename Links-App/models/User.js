// User.js
const {Schema, model, Types} = require('mongoose');

// define schema for 'User' collection in the MongoDB database
const schema = new Schema({
  email: {type:String, required:true, unique:true}, // User's email (required and must be unique)
  password: {type:String, required:true}, // User's password (required)
  links: [{ type:Types.ObjectId, ref:'Link' }] // array of ObjectIDs referencing 'Link' documents
});

/*
  links is array field that contains Types.ObjectId values.
  It represents relationship between "User" and "Link" collections in MongoDB using ObjectIDs.
  It allows multiple "Link" documents to be associated with single "User" document.
*/



// create and export 'User' model based on schema
module.exports = model('User', schema);
// This model can be used to interact with "User" collection in MongoDB. 
