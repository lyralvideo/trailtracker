var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "TrailTracker",
    password: "TTuser",
    database: "trailtracker"
});


router.post('/register', async function (req, res, next) {
    try {let { username, email, password } = req.body;
    const hashed_password = md5(password.toString())
    const checkUsername = `Select username FROM users WHERE username = ?`;
    con.query(checkUsername, [username], (err, result, fields) => {
        if(!result.length){
            const sql = `Insert Into users (username, email, password, favorites) VALUES ( ?, ?, ?, '' )`
            con.query(sql, [username, email, hashed_password],(err, result, fields) =>{
                if(err){
                    res.send({ status: 0, data: err });
                }else{
                    let token = jwt.sign({ data: result }, 'secret')
                    res.send({ status: 1, data: result, token : token });
                }
            }
        )}
    }
);} 
    catch (error) {
        res.send({ status: 0, error: error });
    }
});
router.post('/login', async function (req, res, next) {
    try {let { username, password } = req.body;
    const hashed_password = md5(password.toString())
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
    con.query(sql, [username, hashed_password], function(err, result, fields){
        if(result.length == 0){
            res.send({ status: 0, data: err, message: "user does not exist" });
        } else {
            if(err){res.send({ status: 0, data: err });
            }else{
            let token = jwt.sign({ data: result }, 'secret')
            res.send({ status: 1, data: result, token: token });
            }
        }
    })
} 
catch (error) {res.send({ status: 0, error: error });}
});
router.post('/favorites/:user', async function (req, res, next) {
    try {var username = req.params.user.replace(/[:|&;$%@"<>()+,]/g, "");
   
    const sql = `SELECT Favorites FROM users WHERE username = ?`
    con.query(sql, [username], function(err, result, fields){
            if(err){res.send({ status: 0, data: err });
        }else{
            res.send({ status: 1, data: result});
        }
    })
} 
catch (error) {res.send({ status: 0, error: error });}
});

router.post('/addfav/:username&:favorite', async function (req, res, next) {
    try {var username = req.params.username.replace(/[:|&;$%@"<>()+,]/g, "");
         var favorite  = req.params.favorite.replace(/[:|&;$%@"<>()+]/g, "");
         
    const sql = `SELECT Favorites FROM users WHERE username = ?`
    con.query(sql, [username ], function(err, result, fields){
            if(err){res.send({ status: 0, data: err });
        }else{
res.send({ status: 1, data: result});
            favstring =  result[0].Favorites;
            favstring = favstring + favorite+",";
            const sql2 = 'UPDATE trailtracker.users SET favorites = ? WHERE username = ?;'
            con.query(sql2, [favstring, username], function(err, result, fields) {
                if(err){res.send({ status: 0, data: err });
                    }else{
            
                
                    }
            })
        }
    })
} 
catch (error) {res.send({ status: 0, error: error });}
});


module.exports = router;