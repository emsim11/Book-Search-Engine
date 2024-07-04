const { User } = require('../Models');
const { SignToken } = require('../Utils/Auth');

module.exports = {
    // Retrieve A Single User By ID Or Username
    async GetSingleUser({ User = null, Context }, Res) {
        const FoundUser = await User.findOne({
            $or: [{ _id: User ? User._id : Context._id }, { Username: Context.Username }],
        });

        if (!FoundUser) {
            return Res.status(400).json({ message: 'No User Found With This ID!' });
        }

        Res.json(FoundUser);
    },

    // Create User, Sign Token, And Send It Back To SignUpForm.js
    async CreateUser({ body }, Res) {
        const NewUser = await User.create(body);
        if (!User) {
            return Res.status(400).json({ message: 'Something Went Wrong!' });
        }
        const Token = SignToken(User);
        Res.json({ Token, User });
    },

    // Login User, Sign Token, And Send It Back To LoginForm.js
    async Login({ Body }, Res) {
        const NewUser = await User.findOne({ $or: [{ Username: Body.Username}, { Email: Body.Email }] });
        if (!User) {
            return Res.status(400).json({ message: 'User Not Found' });
        }
        const CorrectPassword = await NewUser.IsCorrectPassword(Body.Password);
        if (!CorrectPassword) {
            return Res.status(400).json({ message: 'Wrong Password' });
        }
        const Token = SignToken(User);
        Res.json({ Token, User });
    },

    // Save Boo To User's `SavedBooks` Field By Adding It To The Set
    // User Comes From `Req.User` Created In The Auth Middleware Function
    async SaveBook({ User, Body }, Res) {
        console.log(User);
        try {
            const UpdatedUser = await User.findOneAndUpdate(
                { _id: User._id },
                { $addToSet: { SavedBooks: Body } },
                { new: true, runValidators: true },
            );
            return Res.json(UpdatedUser);
        } catch (Err) {
            console.log(Err);
            return Res.status(400).json(Err);
        }
    },

    // Remove Book From `SavedBooks`
    async DeleteBook({ User, Context }, Res) {
        const UpdatedUser = await User.findOneAndUpdate(
            { _id: User._id },
            { $pull: { SavedBooks: { BookId: Context.BookId } } },
            { new: true },
        );
        if (!UpdatedUser) {
            return Res.status(404).json({ message: 'No User Found With This ID!' });
        }
        return Res.json(UpdatedUser);
    },
};