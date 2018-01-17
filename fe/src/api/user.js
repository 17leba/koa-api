import axios from 'utils/curl'

async function isLogin(){
	return await axios.get('/api/user/is_login')
}
export default{
	isLogin
}