const { Schema, model, Types} = require('mongoose');


const reactSchema = new Schema(
    {
      reactId: {
        type:Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactBody: { 
    type: String,
    minlength: 15,
    maxlength:280,
    required: true,
      },
  
    username:{
   type: String,
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
            required: true,
            minlength: 15,
            maxlength:280,
            
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
        reacts:[reactSchema],
      },
      
      {
        toJSON: {
          virtuals: true,
          getters:true,
      },
      id: true,
    }
      );

thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reacts.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;


