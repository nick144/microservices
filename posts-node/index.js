const express = require('express');
const mongoose = require('mongoose');
const postRouter = require("./routes/postRoutes");
const session = require('express-session');
const redis = require('redis')
let RedisStore = require("connect-redis")(session)
const cors = require("cors");
const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT, MONGO_HOST, REDIS_PORT, REDIS_URL, SESSION_SECRET, REDIS_USER, REDIS_PASS } = require('./config/config');
const jwt = require('jsonwebtoken')

const app = express();
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}?authSource=admin`;
const port = process.env.PORT || 8001;
console.log(REDIS_URL, REDIS_PORT);
let redisClient = redis.createClient({
    url: `redis://${REDIS_USER}:${REDIS_PASS}@${REDIS_URL}:${REDIS_PORT}`,
    legacyMode: true
})
redisClient.connect().catch(console.error)

const waitTillMonogLoad = () => {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Successfullt connected to DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(waitTillMonogLoad, 300)
        });
}

waitTillMonogLoad();

app.enable("trust proxy");
app.use(cors());
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        httpOnly: true,
        // resave: false,
        // saveUninitialized: false,
        resave: false,
        maxAge: 60*60*24
    }
}));

app.use(express.json());

app.get("/api/v1", (_req, res) => {
    res.send("<h2>Hi, <br /><br /> This is dev enviroment. <br /><br /> Switching to production now.</h2>");
});

app.use("/api/v1/posts", postRouter);

app.listen(port, () => console.log(`listening on port ${port}`));