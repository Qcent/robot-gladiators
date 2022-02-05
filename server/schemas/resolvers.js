const { HiScore } = require('../models');

const resolvers = {
    Query: {
        getScores: async(parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);

                return user;
            }
        }
    },
    Mutation: {
        submitScore: async(parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        }
    }
};

module.exports = resolvers;