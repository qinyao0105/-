import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.server = {
	host: 'http://aqua.applinzi.com/',
	carousel(){
		return this.host + 'carousel'
	},
	courseNewest(count){
		if(count){
			return this.host + 'course/newest?count=' +count
		}else{
			return this.host + 'course/newest'
		}
	},
	courseHottest(count){
		if(count){
			return this.host + 'course/hottest?count=' +count
		}else{
			return this.host + 'course/hottest'
		}
	},
	teacherList(){
		return this.host + 'teacher/list'
	},
	teacherDetail(tid){
		return this.host + 'teacher/detail?tid=' + tid
	},
	type(){
		return this.host + 'type'
	},
	courseList(pageNum,typeId){
		let url = this.host + 'course/list'
		if(pageNum){
			url += '?pageNum=' + pageNum
		}else{
			url += '?pageNum=1'
		}
		if(typeId && typeId>0){
			url += '&typeId=' + typeId
		}
		return url
	},
	courseDetail(cid){
		return this.host + 'course/detail?cid=' + cid
	},
	schoolList(){
		return this.host + 'school/list'
	},
	schoolDetail(sid){
		return this.host + 'school/course?sid=' + sid
	},
	userLogin(){
		return this.host + 'user/login'
	},
	userRegister(){
		return this.host + 'user/register'
	},
	userUpdatePassword(){
		return this.host + 'user/password'
	},
	userUploadAvatar(){		//上传头像文件---得倒服务器端的文件名
		return this.host + 'user/upload/avatar'
	},
	userUpdateAvatar(){		//修改头像---必须先验证登录
		return this.host + 'user/update/avatar'
	},
	userDetails(){
		return this.host + 'user/details'
	},
	captchaRegister(){
		return this.host + 'captcha/register'
	},
	favoriteAdd(){
		return this.host + 'favorite/add'
	},
	favoriteList(){
		return this.host + 'favorite/list'
	},
	cartList(){
		return this.host + 'cart/list'
	},
	cartUpdate(){
		return this.host + 'cart/update'
	},
	cartClear(){
		return this.host + 'cart/clear'
	},
	cartAdd(){
		return this.host + 'cart/add'
	},
	cartDelete(){
		return this.host + 'cart/delete'
	}
}

// 全局价格过滤器
Vue.filter('currency',(val)=>{
	if(val){
		let n = Number(val)
		return '¥' + n.toFixed(2)
	}
})

Vue.filter('phoneMask',(val)=>{
	if(val){
		let arr = val.split('')
		arr.splice(3,5,'*****')
		return arr.join("")
	}
})

Vue.filter('timeStamp',(val)=>{
	if(val){
		let time = new Date(parseInt(val))
		let year = time.getFullYear()
		let month = time.getMonth() + 1
		let day = time.getDate()
		return `${year}-${month}-${day}`
	}
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
