const fs = require('fs')
const path = require('path')
const Busboy = require('busboy')
const tools = require('./../utils/tools')

module.exports = {
	uploadImage (ctx, options){
		let req = ctx.req
		let busboy = new Busboy({
			headers: req.headers
		})

		let fileType = options.fileType || 'common'
		let filePath = options.path
		let mkdirResult = tools.mkdirsSync(filePath)

		return new Promise((resolve, reject) => {
			let result = {
				success: false,
				message: '',
				url: ''
			}
			busboy.on('file', function(fieldname,file,filename,encoding,mimetype){
				let fileName = `${Math.random().toString(16).substr(2)}.${tools.getSuffixName(filename)}`
				let uploadFilePath = path.join(filePath, fileName)
				let saveTo = path.join(uploadFilePath)

				console.log(saveTo,uploadFilePath,fileName)
				file.pipe(fs.createWriteStream(saveTo))
				
				file.on('end', () => {
					result.success = true
					result.message = '文件上传成功'
					result.url = `//${ctx.host}/${fileType}/${fileName}`

					resolve(result)
				})

			})

			busboy.on('finish', () => {
				resolve(result)
				console.log('end')
			})

			busboy.on('error', (e) => {
				console.log(e)
				reject(result)
			})

			req.pipe(busboy)
		})
	}
}