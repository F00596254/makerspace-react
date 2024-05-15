const { model } = require('mongoose');
let zod =require('zod');


const create_User=zod.object ({
    username:zod.string().min(6),
    email:zod.string().email().refine((data) => data.includes("@")),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(8)
})

const user_SignIn=zod.object({
    username:zod.string().min(6) || zod.string().email().refine((data) => data.endsWith("@gmail.com")),
    password:zod.string().min(8)
})

module.exports={
    create_User,user_SignIn
}