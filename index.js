const express = require("express")
var path = require('path');
var methodOverride = require('method-override')
const app = express();
var bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT;
const routes = require("./routes/client/index.route")
const Adminroutes = require("./routes/admin/index.route")
const connect = require("./config/connectDB")
const PATH_ADMIN = require("./config/system")
const flash  = require('express-flash')
var cookieparser = require("cookie-parser");
var session = require('express-session')
var moment  = require("moment")

// Local Path
app.locals.prefix_admin = PATH_ADMIN.prefix_admin;
app.locals.moment = moment

// set template
app.set("views",`${__dirname}/view`)
app.set("view engine","pug")

app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//flash
app.use(bodyParser.json());
app.use(cookieparser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


// connect DB
connect.connectDB();

//route
routes(app)
Adminroutes(app)

//TinyMCE setup
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

          

app.listen(port, () =>{
    console.log(`\n Sever is running at Port ${port}`);

})

