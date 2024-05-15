const express = require('express')
const app = express()
const cors=require('cors');
const { create_User, user_SignIn } = require('./zod');
const { User } = require('./mongo');
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000
app.use(express.json());
app.use(cors());
 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/makerspace/signin",async (req,res)=>{

    const payload=req.body;
    const parsedPayload=user_SignIn.safeParse(payload);
    

    if (!parsedPayload.success) {
        res.status(411).json({
            success:false,
            msg: "You sent the wrong inputs"
        })
        return
    }

    const {username,password}=parsedPayload.data;
    let email="";
    let found=false;
    if(username.endsWith("@gmail.com")){
        email=username;
    }
    
    if(email!=""){
          found=await User.findOne({
            email,password
        })
    }else{
        found=await User.findOne({
          username,password
      })

    }
    console.log(found);
    if(found==null){
        res.status(411).json({
            success:false,
            msg: "You sent the wrong inputs"
        })
        return
    }
    let userFound = Boolean(found)

    if(userFound){
        res.json({
            msg: " User logged-in successfully",
            success:true,
        })
    }


})
app.post("/makerspace/signup",async (req,res)=>{

    const payload=req.body;
    const parsedPayload=create_User.safeParse(payload);

    if (!parsedPayload.success) {
        res.status(411).json({
            success:false,
            msg: "You sent the wrong inputs"
        })
        return
    }

    const {username,email}=parsedPayload.data;
    const found=await User.findOne({
        username,email
    })
    let userFound = Boolean(found)
    
    if(userFound){
        res.json({
            userFound:userFound,
            msg:"User already exists"})
        return
    }
    const user = await User.create({
        username: parsedPayload.data.username,
        email:parsedPayload.data.email,
        first_Name:parsedPayload.data.firstName,
        last_Name:parsedPayload.data.lastName,
        password: parsedPayload.data.password,
    })
    res.json({
        msg: " User created successfully",
        success:true,
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})