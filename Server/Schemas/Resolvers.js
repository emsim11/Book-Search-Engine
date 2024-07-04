const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../Models');
const { SignToken } = require('../Utils/Auth');

const Resolvers = {
    Query: {
        Me: async (parent,  args, context) => {
            if (context.User) {
                const UserData = await User.findOne({ _id: context.User._id }).select(
                    '-__v -assword'
                );
                return UserData;
            }
            throw new AuthenticationError('Login To Use This Feature!');
        },
    },
    Mutation: {
        Login: async (parent, { Email, Password }) => {
            const NewUser = await User.findOne({ Email });

            if (!NewUser) {
                throw new AuthenticationError('User Not Found!');
            }

            const CorrectPassword = await NewUser.IsCorrectPassword(Password);

            if (!CorrectPassword) {
                throw new AuthenticationError('Invalid Login Credentials!');
            }

            const Token = SignToken(User);

            return { Token, NewUser };
        },

        AddUser: async (parent, { Username, Email, Password }) => {
            const NewUser = await User.create({ Username, Email, Password });
            const Token = SignToken(User);
            return { Token, NewUser };
        },

        SaveBook: async (parent, { NewBook }, context) => {
            if (context.User) {
                const UpdatedUser = await User.findByIdAndUpdate(
                    { _id: context.User._id },
                    { $push: { SavedBooks: NewBook } },
                    { new: true },
                );
                return UpdatedUser;
            }
            throw new AuthenticationError('Login To Use This Feature!');
        },

        RemoveBook: async (parent, { BookId }, context) => {
            if (context.NewUser) {
                const UpdatedUser = await User.findOneAndUpdate(
                    { _id: context.NewUser._id },
                    { $pull: { SavedBooks: NewBook } },
                    { new: true },
                );
                return UpdatedUser;
            }
            throw new AuthenticationError('Login To Use This Feature!');
        },
    },
};

module.exports= Resolvers;