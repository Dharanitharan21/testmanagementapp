const mongoose =require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.mongo_url).then(()=>console.log('Mongodb Connected')).catch((err)=>console.log(err))