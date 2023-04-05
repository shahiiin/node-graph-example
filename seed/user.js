

const User = require("../models/users")
const hashPassword = require("../utils/hashPassword");




const users = [
    new User({
        name: "Imo",
        email: "imo@gmail.com",
        token: "-----",
        password: 123456,
    })
];

let done = 0;
 const seedData = async () => {
    try {
        await User.deleteMany({});


        for (let i = 0; i < users.length; i++) {

            await users[i].save();
        }
    } catch (err) {
        console.error(err);
    }

    console.log("Mock data is seeded from seed script.");
};

module.exports =  { seedData };