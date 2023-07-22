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

    // deletes a thought
    async deleteThought(req, res) {
        try{
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            if (!thought){
                return res.status(404).json({message: "No Thought with that ID 😭"});
            }
            const user = await User.findOneAndUpdate(
                {thought: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            );
            if (!user) {
                return res.status(404).json({
                    message: 'Thought deleted but no user with that ID',
                })
            }
            res.json({message: 'thought sucessfully deleted'});
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
// updates a thought
async updateThought(req, res){
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true});
        if(!thought){
            return res.status(404).json({message: 'No thought with that ID'});
        }
        res.json(thought);
    }catch (err) {
        res.status(500).json(err)
    }
},
// gets all reacts
async getReact(req, res){
    try {
        const react = await React.find();
        res.json(react);
    } catch (err) {
        res.status(500).json(err);
    }
},
// get a single react
async getSingleReact(req,res) {
    try {
        const react = await React.findOne({ _id: req.params.reactId });

        if (!react){
            return res.status(404).json({ message: 'No react with that id'});
        }
        res.json(react);
    } catch (err){
        res.status(500).json(err);
    }
},

// create a react
async createReact (req,res){
    try {
        const react =  await React.createContext(req.body);
        const thought = await Thought.findOneAndUpdate(
            {_id: req.body.thoughtId},
            {$push: {react: react._id } },
            { new: true},
        );
        
        if (!thought) {
            return res.status(404)
            .json({message: 'React created, but no Thoughts with this id'});
        }
        res.json({message:'React created'});
    }catch (err){
        console.error(err);
    }
},
// deletes a react
async deleteReact(req, res) {
    try{
        const react = await React.findOneAndDelete({_id: req.params.reactId});
        if (!react){
            return res.status(404).json({message: "No React with that ID"});
        }
        const thought = await Thought.findOneAndUpdate(
            {react: req.params.reactId},
            {$pull: {react: req.params.reactId}},
            {new: true}
        );
        if (!thought) {
            return res.status(404).json({
                message: 'React deleted but no user with that ID',
            })
        }
        res.json({message: 'React sucessfully deleted'});
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
},
};