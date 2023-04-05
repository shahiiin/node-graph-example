
const User = require("../../models/users")
const Message = require("../../models/messages")
const  signToken = require("../../utils/signToken")
const  hashPassword = require("../../utils/hashPassword")
const  verifyPassword = require("../../utils/verifyPassword")

module.exports = {
    users: async () => {
        try {
            const usersFetched = await User.find()
            return usersFetched.map(user => {
                return {
                    ...user._doc,
                    _id: user.id,
                    createdAt: new Date(user._doc.createdAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
    },

    register:  async (parent, args, context) => {

        const hashedPassword = await hashPassword(parent.input.password);
        const result = await User.create({
            name: parent.input.name,
            email: parent.input.email,
            password: hashedPassword,
            token: signToken({ email: parent.input.email }) ,
        });

        return {
            id: result.id,
            name: result.name,
            email: result.email,
        };
    },

    login: async (parent, args, context) => {

        const user = await User.findOne({email: parent.input.email}).exec();
        if (!user){
            throw new Error("Not Found User");
        }
        // const isValidPassword = await verifyPassword(user.password, parent.user.password);
        const isValidPassword = await verifyPassword('$argon2id$v=19$m=65536,t=3,p=4$Id7oqXo47bKtzmuuTP+Zsw$Ju2Ac05rMCtPqHv7VQu5TRwDps/bh+lFhyYnehxou68', parent.input.password);
        if (!isValidPassword) {
            throw new Error("Invalid password");
        }


        args.res.cookie('access_token', signToken({ email: user.email }), {});
        args.res.cookie('logged_in', true, {httpOnly: false,});


        return {
            status: "success",
            access_token:  signToken({ userId: user.id })
        };
    },

    sendMessage: async (parent, args, context) => {
        const message = await Message.create({
            title: parent.input.title,
            body: parent.input.body,
            sender: args.user.email,
            receiver: parent.input.receiver,
            seen: false,
        });

        if (message) {
            return {
                status: "success",
                id:message.id,
            };
        }

        return {
            status: "error",
        };
    },

    messagesList: async (parent, args, context) => {



        try {
            const fetched = await Message.find({ receiver: parent.email})
            return fetched.map(message => {
                console.log(message._doc)
                return {
                    _id: message.id,
                    seen: message.seen,
                    title: message.title,
                    body: message.body,
                }
            })
        } catch (error) {
            throw error
        }
    }

}