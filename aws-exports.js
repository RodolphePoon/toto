// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
	aws_project_region: "eu-west-1",
	aws_content_delivery_bucket: "foodhere-20190427142440--hostingbucket",
	aws_content_delivery_bucket_region: "eu-west-1",
	aws_content_delivery_url: "https://d2bkbrmhagyjt5.cloudfront.net",
	aws_cognito_identity_pool_id:
		"eu-west-1:9001f0cc-95e6-4de4-acb8-5f7578762a12",
	aws_cognito_region: "eu-west-1",
	aws_user_pools_id: "eu-west-1_fft6mTB9P",
	aws_user_pools_web_client_id: "3pffjfp2046senlgp6aoti39nn",
	oauth: {
		domain: "foodhere.auth.eu-west-1.amazoncognito.com",
		scope: [
			"phone",
			"email",
			"openid",
			"profile",
			"aws.cognito.signin.user.admin"
		],
		redirectSignIn: "http://localhost:3000/",
		redirectSignOut: "http://localhost:3000/",
		responseType: "code"
	},
	federationTarget: "COGNITO_USER_POOLS",
	aws_appsync_graphqlEndpoint:
		"https://ztn5acmqtfbqxdtqw4kq6jrq2e.appsync-api.eu-west-1.amazonaws.com/graphql",
	aws_appsync_region: "eu-west-1",
	aws_appsync_authenticationType: "API_KEY",
	aws_appsync_apiKey: "da2-aekzx6bqxfdzlasw5noyrgpxqu"
};
module.exports = awsmobile
