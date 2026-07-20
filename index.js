const express = require("express");
const app = express();
const mongoose = require('mongoose');
const PORT = 8000;
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { type } = require("os");

app.use(express.urlencoded({extended: false}));


//connnection mongoDb
mongoose
    .connect("mongodb://127.0.0.1:27017/yt-app1")
    .then(()=> console.log("connected Mdb"))
    .catch(err => console.log('Not connected'));

//schema
const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String
    }
}, {timestamps: true});


//model
const User1 = mongoose.model("user", schema);

//middleware
app.use((req, res, next)=> {
    fs.appendFile('log.txt', `${Date.now()}: ${req.method}: ${req.path}\n`, (err, data) =>{
        next();
    })
})

app.get("/api/users", (req, res) => {
    console.log(req.headers);
    res.setHeader('myName', 'piyush');
    return res.json(users);
});


app
    .route("/api/users/:id")
    .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user){
        return res.status(404).json({ error: 'user not found'});
    }
    return res.json(user);
}).patch((req, res) => {
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
    })

}).delete((req, res) => {
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
    })
})


app.post("/api/users", async (req, res) => {
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
});


app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});


app.listen(PORT, () => console.log(`Server Started at: ${PORT}`));