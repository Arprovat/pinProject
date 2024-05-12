const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the post schema
const PostSchema = new Schema({
  postText: {
    type: String,
    required: true, // Content must be provided
  },
  image: {
    type: String,
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
},
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId, // Assuming each like is from a user, referencing a User model
      ref: 'User', // Reference to the User model
    },
  ], 
  date: {
    type: Date,
    default: Date.now, 
  },
});
module.exports = mongoose.model('Post', PostSchema);

