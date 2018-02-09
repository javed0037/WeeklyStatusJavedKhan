var express = require('express');
var app = express();
var user = require('./models/users');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var bcrypt = require('bcrypt');
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyparser.json())
mongoose.connect('mongodb://localhost/weekly')
console.log("hiiiiii");
app.post('/createUser', (req, res) => {
    console.log("hiii", req.body)
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    bcrypt.hash(password, 12, function(err, hash) {
      if(err){
        res.json({

        message : 'pass not encrypt'
        })

      }
    if (name && password && email) {

        console.log("222");
        let userObj = {
            name: name,
            email: email,
            password: hash
          }
        user.create(userObj, function(err, data) {
            console.log(err, data)
            if (err) {
                res.json({
                    messsage: 'enter the data',
                    status: 200
                })
            }
            if (data) {
                res.json({
                    message: 'create sucessfully',
                    status: 400,
                    data: data
                })
            }
             else {
                res.json({
                    status: 200,
                    message: 'enter the details',
                    data: data
                })
            }
        });
     }
   })
})
app.listen(9090, () => {
    console.log('listening on port: 9090')
})
