const { HiScore } = require('../models');

const resolvers = {
    Query: {
        getScores: async(parent, args, context) => {

            return {
                _id: "abc1234",
                robot: "Mr. Roboto",
                trainer: "KillRoy",
                score: 10069542,
                rounds: 14,
                points: 12345
            }
            return await HiScore.find({});

        }
    },
    Mutation: {
        submitScore: async(parent, args, context) => {
            console.log(args);
            const newScore = await HiScore.create({ scores: args.score });

            //return await HiScore.find();

            return newScore

        }
    }
};

module.exports = resolvers;