const mongoose = require('mongoose');
const plm =require('passport-local-mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/pinProjects");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Enforces uniqueness in the database
  },
  fullname: {
    type: String,
    required: true,
    unique: true, // Enforces uniqueness in the database
  },
  password: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
   
  },
  posts: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ], 
  dp: {
    type: String, // Assuming dp is a URL or file path for a profile picture
  },
  createdAt: {
    type: Date,
    default: Date.now, // Stores the creation time of the document
  },
});
UserSchema.plugin(plm);
// Create a Mongoose model from the schema
module.exports  = mongoose.model('User', UserSchema);



