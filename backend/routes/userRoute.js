const express = require('express');
const User = require('../models/userModel')
const {getToken, isAuth, isAdmin} = require('../util');
var bcrypt = require('bcrypt-nodejs');
const tempPassword = process.env.TEMP_PASSWORD || 'undukushu';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find({});
    res.send(users);
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    const user = await User.findOne({_id:userId});
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).send({msg:"Expense Not Found!"});
    }
});

router.post("/", isAuth, isAdmin, async (req, res)=>{
    const loginIDExists = await User.findOne({
        name:req.body.loginID
    });
    if (loginIDExists) {
        return res.status(404).send({msg: 'User login ID already exists !!'})
    }
    const emailExists = await User.findOne({
        email:req.body.email
    });
    if (emailExists) {
        return res.status(404).send({msg: 'email already exists !!'})
    }

    var user= new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.loginID = req.body.loginID;
    user.phone = req.body.phone;
    user.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(5),null);
    user.fees = [{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"},{payMethod:"0", amount:"0"}]
    user.batches = [{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false},{isBatch:false}]

    const newUser = await user.save();
    if(newUser){
        res.send({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            loginID:newUser.loginID,
            phone:newUser.phone,
            isAdmin:newUser.isAdmin,
            fees:newUser.fees,
            batches:newUser.batches,
            token: getToken(newUser)
        })
    }
    else {
        res.status(401).send({msg: 'Invalid User Data'})
    }
})



router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.loginID = req.body.loginID || user.loginID;
      user.phone = req.body.phone || user.phone;
      if (req.body.password !== tempPassword) {
        user.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(5),null);
      }
      user.fees = req.body.fees || user.fees;
      user.batches = req.body.batches || user.batches;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        loginID: updatedUser.loginID,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
        fees:updatedUser.fees,
        batches:updatedUser.batches,
        token: getToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  });
  
  router.delete("/:id", isAuth, isAdmin, async (req, res)=>{
    const userId = req.params.id;
    const user = await User.findOne({_id:userId});
    if(user){
        user.remove();
        res.send({message:"Expense Deleted!"});
    }
    else{
        res.send({message:"Error in Expense Deletion!"});
    }
})

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        loginID:req.body.loginID
    });
    if (!signinUser) {
        return res.status(404).send({msg: 'No User ID found'})
    }
    if (!bcrypt.compareSync(req.body.password,signinUser.password)) {
        return res.status(404).send({msg: 'Wrong password'})
    }
    if(signinUser){
        return res.send({
            _id:signinUser._id,
            name:signinUser.name,
            email:signinUser.email,
            loginID:signinUser.loginID,
            phone:signinUser.phone,
            isAdmin:signinUser.isAdmin,
            fees:signinUser.fees,
            batches:signinUser.batches,
            token: getToken(signinUser)
        })
    }
    else {
        return res.status(401).send({msg: 'Invalid e-mail or password'})
    }
})

router.post('/createadmin', async (req, res) => {
    try{
            const adminUser = await User.findOne({
                isAdmin:true,
            });
    
            if (adminUser){
                res.status(401).send({msg:'Admin already exists'});    
            }
            else {
                var user= new User();
                user.name = req.body.name;
                user.email = req.body.email;
                user.loginID = req.body.loginID;
                user.phone = req.body.phone;
                user.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(5),null);
                user.isAdmin = true;
                user.fees = {};
                user.batches = {};
                const newUSer = await user.save();
                res.send(newUSer);
            }
        } catch(error) {
            res.send({msg:error.message});
        }
})

module.exports = router;