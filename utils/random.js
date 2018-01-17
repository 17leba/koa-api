const debug = require('debug')('Random:id')
const Type = require('./type')

function random(options){
	if(!Type.isObject(options)){
		debug('options must be a Object!')
		return
	}
	let result = {}
	Object.keys(options).forEach((v,i) => {
		let val = options[v]
		if(Type.isString(val) || Type.isNumber(val)){
			result[v] = val
		}else if(Type.isArray(val)){
			let length = val.length
			result[v] = val[Math.floor(Math.random() * length)]
		}else{
			debug(`${options[v]} must be a Array or String!`)
		}
	})
	return result
}
module.exports = random