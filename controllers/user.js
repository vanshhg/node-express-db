const User = require('../models/user');

async function handleGetAllusers(req, res){
    const allDbusers = await user.find({});
    return res.json(allDbusers);
}

async function handleGetId(req, res){
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user){
        return res.status(404).json({ error: 'user not found'});
    }
    return res.json(user);
}

async function handlePatchId(req, res){
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    const body = req.body;
    users[index] = { ...users[index], ...body};
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to save" });
        }
        return res.json(users[index]);
    });
}

async function handleDeleteId(req, res){
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    users.splice(index, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete" });
        }

        return res.json({status: 'success'});
    });
}

async function handleCreateUser(req, res){
    const body = req.body;  
    if( !body || !body.first_name || !body.last_name || !body.email || !body.job_titlw ){
        return res.status(400).json({ status: 'All fields are required'});
    }
    
    //storing the user in the mongodb database
    const result = await User1.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_titlw,
    });
    console.log(result);
    return res.status(201).json({msg: 'success'}); 
}

module.exports = {
    handleGetAllusers, 
    handleDeleteId, 
    handleGetId, 
    handlePatchId,
    handleCreateUser
};