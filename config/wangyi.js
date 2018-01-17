const tools = require('./../utils/tools')

module.exports = {
	dynamicUrl: 'https://c.m.163.com/dlist/article/dynamic',
	devId: 'YfV2ZwE7tQg9qtUoaFs1jMyRczTI8IGN4SkTlTKB3wpLNmqpVD48IAR46PgKOk5K',
	channelList: [
		'T1348648517839',
		'T1348649079062',
		'T1348648756099',
		'T1348649580692',
		'T1348650593803',
		'T1473054348939',
		// 'T1474271789612',
		'T1350383429665',
		'T1348648141035',
		'T1368497029546',
		'T1370583240249',
		'T1348654151579',
		'T1414389941036',
		'T1444270454635',
		'T1356600029035',
		'T1467284926140',
		],
	offset: 0,
	size: 10,
	fn: tools.generateArray(1,50),
}