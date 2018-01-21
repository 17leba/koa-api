module.exports = {
	questionUrl: 'https://www.zhihu.com/api/v4/questions/',
	sortBy: ['default'/*, 'created'*/],
	limit: [20, 40, 60, 100, 200],
	offset: 0,
	urlTocken: '2a8481dfd21e459d4386b86960c96049',
	include: 'data[*].is_normal,admin_closed_comment,reward_info,is_collapsed,annotation_action,annotation_detail,collapse_reason,is_sticky,collapsed_by,suggest_edit,comment_count,can_comment,content,editable_content,voteup_count,reshipment_settings,comment_permission,created_time,updated_time,review_info,relevant_info,question,excerpt,relationship.is_authorized,is_author,voting,is_thanked,is_nothelp,upvoted_followees;data[*].mark_infos[*].url;data[*].author.follower_count,badge[?(type=best_answerer)].topics',
	headers: {
		'Cookie':'l_cap_id="NjZhMzNjZmFlMWViNDUwOGJiZWEwMDE1MDBjYTZkOTQ=|1515572168|801918d09f48c1f63cf0ca6265857bc65488f6a5"; aliyungf_tc=AQAAAEwJmTBF1wQAizt0e+R6cpEI3dae; d_c0="APDhn7nd9wyPTpDtMF4kNkhCXCA5wLzuR4c=|1515572443"; q_c1=f22d177f93a846c4b7b7eba79bd5a06d|1515572443000|1515572443000; _zap=bcc9b43f-13b8-4fff-b0fd-348e586b63c0; capsion_ticket="2|1:0|10:1515572493|14:capsion_ticket|44:MDk5ZDY3ZTU2YmQ0NGNjN2FjODhjNjVkNWRkMTVmZDY=|58392b8643eaed81ab4afcd273493af488ede7b6f1690cf11df12aa5e5c245dc"; z_c0="2|1:0|10:1515572494|4:z_c0|92:Mi4xMFRFRUFBQUFBQUFBOE9HZnVkMzNEQ1lBQUFCZ0FsVk5EaHREV3dDeXZtc2lHcnhsWkNVNl8zSnFvRDg2WFdzaFJR|60c069ef886ebebf1df474508da89e5baebb14c3550291a371a0580dd6d1e12a"; _xsrf=6814bb09-ea31-4f91-bf14-93304ea24d61',

	}
}