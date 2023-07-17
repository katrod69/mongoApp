const {Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch (err){
            res.status(500).json(err);
        }
    },
    // pulls a single thought
    async getSingleThought(req,res) {
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId});
        
            if (!thought){
                return res.status(404).json({message: 'No thought with that ID 😭'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id} },
                {new:true}
            );
            
            if (!user) {
                return res
                .status(404)
                .json({ message: 'Thought created but found no user with that ID 😭 '});
            }

            res.json('Created Thought');
        }catch (err){
            console.log(err)
            res.status(500).json(err);
        }
    },
};