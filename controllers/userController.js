const {User, Thought} = require('../models');


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
      const users = await User.findOne({ _id: req.params.userId }).populate("thought").populate("friends")
      .select('-__V');

      if (!users) {
        return res.status(404).json({ message: 'No user with that ID 😭' });
      }

      res.json(users);
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
      const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID 😭' });
    }
    await Thought.deleteMany({_id: {$in: user.thought} });
    res.json({message: 'User and Thoughts deleted '});
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // updates single user
  async updateUser(req,res) {
    try{
      const user =  await User.findOneAndUpdate(
        { _id: req.params.userId},
        {$set: req.body},
        { runValidators: true, new:true});

      if (!user){
        return res.status(404).json({message: 'No user with that ID 😭'});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // adds a friend to the user profile
  async addFriend(req, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      {$addToSet: {friends: params.friendId}},
      {new: true, runValidators: true}
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User with this ID 😭 '});
          return;
        }
        res.json(dbUserData);
      })
      .catch((err)=> res.json(err));
  },

  // deletes friend using the user profile
  async deleteFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      {$pull: {friend:params.friendId}},
      {new: true}
    )
    .then((dbUserData) =>{
      if (!dbUserData) {
        return res.status(404).json({message: 'No user with this ID 😭'})
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
  },
};
