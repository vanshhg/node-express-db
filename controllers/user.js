const User = require('../models/user');

async function handleGetAllusers(req, res){
    const allDbusers = await User.find({});
    return res.json(allDbusers);
}

async function handleGetId(req, res){
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
}

async function handlePatchId(req, res){
    await User.findByIdAndUpdate(req.params.id, {lastName: "changed"});
    return res.json({status: "success"});
}

async function handleDeleteId(req, res){
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        return res.status(404).json({
            error: "User not found",
        });
    }
    return res.json({status: "success"});
}

async function handleCreateUser(req, res){
    const body = req.body;  
    if( !body || !body.first_name || !body.last_name || !body.email || !body.job_title ){
        return res.status(400).json({ status: 'All fields are required'});
    }
    
    //storing the user in the mongodb database
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
    });
    console.log(result);
    return res.status(201).json({msg: 'success'}); 
}

async function handlehtml(req, res){
    const users = await User.find({});

    const html = `
    <ul>
        ${users.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
    `;

    return res.send(html);
}

module.exports = {
    handleGetAllusers, 
    handleDeleteId, 
    handleGetId, 
    handlePatchId,
    handleCreateUser,
    handlehtml
};