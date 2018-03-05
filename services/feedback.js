const feedbackModel = require('./../models/feedback')

module.exports = {
	async updateFeedbackRecord(data) {
		let result
		result = await feedbackModel.insertFeedbackData({
			user_id: data.user_id,
			content: data.content
		})
		return result
	}
}