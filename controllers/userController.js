const User = require('../models/user');

module.exports = {
  // gets all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // gets one user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// deletes user
  async deleteUser(req, res){
    try{
      const User = await User.findOneAndDelete({_id: req.params.userId});
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    await thought.deleteMany({_id: {$in: users.thoughts} });
    res.json({message: 'User and thoughts deleted'});
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // updates single user
  async updateUser(req,res) {
    try{
      const user =  await User.findOneAndUpdate({ _id: req.params.userId});
      if (!user){
        return res.status(404).json({message: 'No user with that ID'});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  }};