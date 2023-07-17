const {Thought, React } = require('../models');

module.exports = {
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
                .json({message: 'react created, but no thoughts with this id'});
            }
            res.json({message:'react created'});
        }catch (err){
            console.error(err);
        }
    },
};