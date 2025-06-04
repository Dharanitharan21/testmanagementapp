const express = require('express')
const http_server=express()
require('./Database/dbconfig')
const cors =require('cors')

port= process.env.port || 3000

http_server.use(express.json())
http_server.use(express.urlencoded({extended:false}))
http_server.use(cors())

http_server.listen(port,()=>{
       console.log(`Listening port at ${port}`);    
})

http_server.use('/' ,require('./app'))