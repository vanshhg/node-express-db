const mongoose = require('mongoose');


//connnection mongoDb
async function connectMdB(url){
    return mongoose.connect(url);
}
    
module.exports = {
    connectMdB,
};