const { Schema, model}= require('mongoose');

const userSchema = new Schema(
    {
        username:{
        type:String,
        unique: true,
        required: true,
        trim: true,
    },
    
        email: {
            type: String,
        required: true,
        unique: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/],
        },
        thought: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        
        toJSON: {
            virtuals: true,
            getters:true
        },
        id: true,
    }
);

userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;