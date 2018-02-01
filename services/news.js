module.exports = {
	handleNewsBody (data){
		if(!data.body || !Object.keys(data.body).length){
			return {}
		}
		data.img.forEach(v => {
			data.body = data.body.replace(v.ref, `<img src="${v.src}" class="news-img">`)
		})
		return data
	}
}