const { Schema, model}= require('mongoose');

const UserSchema = new Schema(
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
        Thought: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        Friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        
        toJSON: {
            virtuals: true,
        },
        id: true,
    },


);

UserSchema
.virtual('friendCount')
.get(function () {
    return this.Friends.length
});

const User = model('User', UserSchema);

module.exports = User;