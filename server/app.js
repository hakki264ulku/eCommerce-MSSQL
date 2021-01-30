const express = require('express');
const customerRouter = require('./routers/customerRouter');
const sellerRouter = require('./routers/sellerRouters')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json())// parsing the incoming json files
app.use(express.static('public'))
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: GET");
    next();
});

app.use(sellerRouter);
app.use(customerRouter);
app.options('*', cors())
// app.use(cors({origin: true, credentials: true}));

app.listen(port, () => {
    console.log('server is up on port ' + port);
})