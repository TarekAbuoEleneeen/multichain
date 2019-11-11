"use strict"
const assert = require("assert");
var express = require('express');
const bodyParser = require('body-parser');
const { Publish } = require('multichain-api/Commands/Publish')
const { Subscribe } = require('multichain-api/Commands/Subscribe')
const { RpcClient } = require('multichain-api/RpcClient')
const port = process.argv[2];
const app = express();
const multichain = RpcClient({
    protocol: 'http',
    port: 7180,
    host: '167.71.94.74',
    username: "multichainrpc",
    password: "YnYPPpwfwX6Ho5G8aNdbzuuY36gM13T7qjXfvzY55X2"
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// multichain.listStreams("stream1").then((t)=> {
//      console.log(t)
//  })


app.post('/ta', function (req, res) {
 const key = req.body.key;
 const data = req.body.data;
    multichain(Publish("stream1",
     key,
        data)).then(() => {
     res.json({note: 'posted successfully!'})
 }).catch(e => {
     console.log(e)
 })
});
app.get('/la',function(req,res){
    multichain(Subscribe("stream1",true)).then((habd) => {
        console.log('habd',habd)
    }).catch(e => {
        console.log(e)
    })
})
app.listen(port, function () {
    console.log(`listening on port ${port}...`)
});