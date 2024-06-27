const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});
        const formattedDateTime = formatter.formate(date);
        return formattedDateTime;
      }
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
