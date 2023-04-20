const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");
const db = require('../../_db/db')
const crypto = require("crypto");

module.exports = {
    auth,
    create
};


// async function auth({ email, password }) {

//     const user = await db.User.findOne({where: {email}})
//     if(!user){
//         throw {message: "invalid user", status:400 }
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//           throw { message: "invalid user", status: 400 }
//       }
//       const payload = {
//         user:{
//             id: user.id,
//         }
//       }
// const token = jwt.sign(payload, config.secret,{expiresIn: '1h'})

// let resultuser = await user.get()

// resultuser = {
//     email: resultuser.email,
//     status: 200
// }

// return {token,...resultuser}
// }

async function auth({ email, password }) {
    const user = await db.User.findOne({
        where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
        return { message: "Email or password is incorrect", status: 403 };

    const token = `Bearer ${jwt.sign({ sub: user.id }, config.secret, {
        expiresIn: "7d",
    })}`;
    let resultUser = await user.get();

    resultUser = {
        email: resultUser.email,
        status: 200,
    };
    return { ...(resultUser), token };
}

async function create(params) {
    if (!validator.validate(params.email)) {
        throw { message: params.email + '" is not a valid email.', status: 409 };
    }
    // val
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw {
            message: 'Email "' + params.email + '" is already taken',
            status: 409,
        };
    }

    // hash password
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }
    let newUser = {
        email: params.email,
        password: params.password,
        role: `user`,
    };
    // save user
    await db.User.create(newUser);
    console.log("creater user");
}
