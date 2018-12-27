/*
* @Author: Star
* @Date:   2018-12-24 15:55:10
* @Last Modified by:   Star
* @Last Modified time: 2018-12-27 18:30:52
*/
import axios from 'axios'

// 创建instance实例
const instance = axios.create({
	// 基础url
  baseURL: `http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  // baseURL: `http://127.0.0.1:${process.env.PORT||3000}`,
  // 超时时间
  timeout: 1000,
  // 请求头部
  headers: {}
})

export default instance