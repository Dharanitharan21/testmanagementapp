const {model ,Schema} =require('mongoose')
const bcrypt =require('bcrypt')
const adminschema= new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

adminschema.pre('save' ,async function (next) {
      this.password=await bcrypt.hash(this.password,10)
        next()
})

adminschema.methods.comparepassword= async function (password,userpassword) {
    return await bcrypt.compare(password,userpassword)
    
}

module.exports=model('admin',adminschema)