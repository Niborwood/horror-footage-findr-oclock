require('dotenv').config();

// Defining Express
const express = require('express');
const app = express();

// Swagger Config
const expressSwagger = require('express-swagger-generator')(app);
const options = {
    swaggerDefinition: {
        info: {
            description: `Propose une liste de films d''horreur à visionner ce soir`,
            title: 'Horror footage finder',
            version: '1.0.0',
        },
        host: 'horror-footage-api.herokuapp.com',
        basePath: '/api/v1',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./app/routers/*.js']
};
expressSwagger(options);

const port = process.env.PORT || 3001;
const router = require('./app/routers');

app.use(express.json());

// CORS MIDDLEWARE
app.use((req, res, next) => {
    const allowedOrigins = ['https://horror-footage-finder.netlify.app', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    // res.header('Access-Control-Allow-Origin', ['http://localhost:3000']); // Ancienne version unique

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-CSRF-TOKEN');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
    // response to preflight request
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

// PARSERS
app.use(express.urlencoded({
    extended: true
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// CSRF PROTECTION, TO PLACE AFTER COOKIE COOKIE-PARSER
const csrf = require('csurf');
const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: true, // only set cookies over https, to remove when in localhost,
        sameSite: 'None',
    }
});
app.use(csrfProtection);

// ROUTER
app.use(router);

// LAUNCHING SERVER
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});