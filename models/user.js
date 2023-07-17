const { Schema, model}= require('mongoose');

const userSchema = new Schema(
    {
        username:{
        text:String,
        unique: true,
        required: true,
        minLength: 6,
        maxLength: 20,

        },
        email: {
            type: String,
        required: true,
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        validate:{
            validator: (value)
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
        toJSON: {
            virtuals: true,
        },
        id: false
    }}
);

userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;