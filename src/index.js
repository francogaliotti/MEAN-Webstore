const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');

const productRoutes = require('./routes/product');

//settings
app.set('views', path.join(__dirname, 'views'))
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use('/api',productRoutes)

//static files
app.use(express.static(path.join(__dirname,'dist/client')));

//start server
app.listen(app.get('port'),() => {
    console.log("Server on port", app.get('port'))
})