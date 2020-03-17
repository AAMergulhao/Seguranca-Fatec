module.exports = {
    database:{
        mongoUri: process.env.MONGO_URI
    },
    auth:{
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
        githubClientPublic: process.env.GITHUB_CLIENT_PUBLIC,
        githubCallbackUrl: process.env.GITHUB_CALLBACK_URL
    },
    cookieKey: process.env.COOKIE_KEY
};