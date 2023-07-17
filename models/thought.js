const { Schema, model, Types} = require('mongoose');

const reactSchema = new Schema(
    {
      reactId: {
        type:Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactBody: { 
    text: String,
    minLength: 15,
    maxLength:280,
    required: true,
      },
  
    username:{
   text: String,
   required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  
      
  });

const thoughtSchema = new Schema(
    {
        text: {
            type: String,
            
        minLength: 15,
        maxLength:280,
        required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type:String,
            required: true,
        },
        reacts:[
            {
                type: Schema.Types.ObjectId, ref: 'react'
            },
            ],
},
);

thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reacts.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;


// array of _id values referencing the thought model?