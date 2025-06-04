const express=require('express')
const app =express()

app.use('/api',require('./Routers/adminrouter'))
app.use('/api',require('./Routers/questionrouter'))
app.use('/api',require('./Routers/testrouter'))


module.exports=app