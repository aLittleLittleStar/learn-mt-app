/*
* @Author: Star
* @Date:   2018-12-24 15:54:30
* @Last Modified by:   Star
* @Last Modified time: 2018-12-27 18:29:52
*/
// 创建模型
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})

export default mongoose.model('User',UserSchema)
