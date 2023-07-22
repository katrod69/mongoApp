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
      const user = await User.findOne({ id: req.params.Userid }).populate("Thought").populate("Friends")
      .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID 😭' });
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
      const user = await User.findOneAndDelete({ id: req.params.Userid });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID 😭' });
    }
    await Thought.deleteMany({id: {$in: User.Thought} });
    res.json({message: 'User and Thoughts deleted '});
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // updates single user
  async updateUser(req,res) {
    try{
      const user =  await User.findOneAndUpdate(
        { id: req.params.Userid},
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
    try{
    const friend = await User.findOneAndUpdate(
      {_id: req.params.Userid},
      {$addToSet: {Friends: req.params.Friendsid}},
      {new: true, runValidators: true}
    )
        if (!friend) {
          return res.status(404).json({ message: 'No User with this ID 😭 '})
        }
        res.json(friend);
      } catch (err) {
        res.status(500).json(err);
      }
      
      
  },

  // deletes friend using the user profile
  async deleteFriend(req, res) {
    try{
   const friend = await User.findOneAndUpdate(
      {_id: req.params.Userid},
      {$pull: {Friends: req.params.Friendsid}},
      {new: true}
    )
    if (!friend) {
      return res.status(404).json({ message: 'No User with this ID 😭 '})
    }
    res.json(friend);
  } catch (err) {
    res.status(500).json(err);
  }
  
  },
};
