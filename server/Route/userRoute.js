require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("../src/middleware/auth");

const userController = require('../Controller/userController');
// --- google sign-up--
const passport = require('passport');
const session = require('express-session');
app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Include cookies in cross-origin requests
    optionsSuccessStatus: 201
  }));




const Images_path = path.join(__dirname, "../public/images");
app.use(express.static(Images_path));


const multer = require('multer');

const storageprofile = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, '../client/public/images');
    },
    filename:function(req,file,cb){
        const name = file.originalname + '-' + Date.now()
        cb(null,name);
    }
});
const uploadprofile = multer({storage:storageprofile});


app.post("/register",uploadprofile.single('image'), userController.register);

app.post('/login',userController.login);

app.get("/NewsApi",auth.isLogin ,userController.NewsApi);
app.get("/Profile",auth.isLogin ,userController.Profile);

app.post("/update-user-profile-image",uploadprofile.single('image'), userController.updateUserProfileImage);
app.post("/update-user-profile",uploadprofile.single('image'), userController.updateProfileNames);
app.post("/update-Other-users-profile",uploadprofile.single('image'), userController.updateProfileOtherUsers);

const upload = multer();
app.post("/Delete-Other-users-profile",upload.none() ,userController.DeleteProfileOtherUsers);

app.post("/NewsapiDatasend",upload.none(),userController.NewsapiDatasend);
app.get("/NewsapiDataGet",userController.NewsapiDataGet);
app.post("/PostNewsApistore",upload.none(),userController.PostNewsApistore);
app.get("/Showstoreddata-frontend",userController.ShowStoredData);
app.get("/SearchData",userController.SearchData);

app.get("/logOut",userController.logOut);

app.post("/subscribe",upload.none(),userController.subscribe);
const nodemailer = require("nodemailer");

app.post("/sendemail",upload.none(), async (req,res)=>{
            emailuser = req.body.email
            subject = req.body.subject
            console.log(emailuser,subject)

            var transporter = nodemailer.createTransport({
                service:'gmail',
                port:587,
                secure:false,
                auth:{
                    user:process.env.useremail,
                    pass:process.env.emailpass
                }
            })
            var mailOptions = {
                from:`${emailuser}`,
                to:process.env.useremail,
                subject:subject,
                html : `<p style="background: #333;padding: 10px; color: #fff;font-size: 28px; text-align: center;">Contact Us Email</p>
            <p style="padding: 10px;margin: 1px; background: #222;color: #f2f2f2; font-family: math; font-size: 20px; padding-left: 100px;">
                <strong style="color: #72f706;padding: 10px;">Name:</strong> ${req.body.name}
            </p>
            <p style="padding: 10px;margin: 1px; background: #222;color: #f2f2f2; font-family: math; font-size: 20px; padding-left: 100px;">
                <strong style="color: #72f706;padding: 10px;">Email:</strong> ${req.body.email}
            </p>
            <p style="padding: 10px;margin: 1px; background: #222;color: #f2f2f2; font-family: math; font-size: 20px; padding-left: 100px;">
                <strong style="color: #72f706;padding: 10px;">Phone Number:</strong> ${req.body.number}
            </p>
            <p style="padding: 10px;margin: 1px; background: #222;color: #f2f2f2; font-family: math; font-size: 20px; padding-left: 100px;">
                <strong style="color: #72f706;padding: 10px;">Message:</strong> ${req.body.message}
            </p>
            <p style="background: #333;padding: 10px; color: #fff;font-size: 28px; text-align: center;">From Mkcoding</p>`
            }
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err);
                }else{
                    console.log("Email Sent " + info.response);
                    res.status(201).json({msg:'send Successfully'})
                }
            })
            
        }
);

module.exports = app;