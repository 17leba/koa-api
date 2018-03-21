const path = require('path')
const uploadService = require('./../services/upload')

module.exports = {
	async uploadImage (ctx){
		if(ctx.method !== 'POST'){
			ctx.body = 'Request method must be post!'
		}else{
			let result = {
				success: false
			}
			let serverFilePath = path.join(__dirname, './../static/image')
			result = await uploadService.uploadImage(ctx, {
				fileType: 'image',
				path: serverFilePath
			})
			ctx.body = result
		}
	}
}