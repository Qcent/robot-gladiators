const { HiScore } = require('../models');

const resolvers = {
    Query: {
        getScores: async(parent, args, context) => {

            return HiScore.find();

        }
    },
    Mutation: {
        submitScore: async(parent, args, context) => {
            console.log(args);
            const newScore = await HiScore.create(args);

            //return await HiScore.find();

            return newScore

        }
    }
};

module.exports = resolvers;