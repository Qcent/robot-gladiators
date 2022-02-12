const { HiScore } = require('../models');

const resolvers = {
    Query: {
        getScores: async(parent, args, context) => {
            // finds and returns the top 5 scores of the week
            const hiScores = await HiScore.find({
                    "createdAt": {
                        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
                    }
                })
                .sort({ score: -1 })
                .limit(5);

            return hiScores
        }
    },
    Mutation: {
        submitScore: async(parent, args, context) => {
            console.log("############### NEW SCORE SUBMITTED #################");
            const newScore = await HiScore.create(args);

            return newScore

        }
    }
};

module.exports = resolvers;