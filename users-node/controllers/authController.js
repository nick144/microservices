const User = require("../models/Users")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/config");

exports.signUp = async (req, res) => {
    const { 
        username, 
        password, 
        firstname, 
        lastname, 
        email,
        phone
    } = req.body;
    const hassPassword = await bcrypt.hash(password, 12);
    try {
        
        if (!(email)) {
            throw 'Please enter valid email';
        }

        if (!(username && password && firstname)) {
            throw 'Please enter valid user data';
        }
        
        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: hassPassword,
            phone: phone
        });

        if (!user)  {
            throw 'User not created';
        }

        req.session.user = user;
        
        const id = user['_id'];
        const token = jwt.sign({user_id: id}, TOKEN_SECRET, {
                    expiresIn: "2h",
                });
        req.session.token = token;
        
        return res.status(201).json({
            status: 1,
            auth: true,
            token: token,
            data: {
                user: {
                    user_id: id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                }
            }
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 0,
            auth: false,
            message: (e && Object.keys(e).length !== 0) ? e : 'Something went wrong please try again'
        })
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {

        if (!(username && password)) {
            throw 'Please enter valid username password';
        }

        const user = await User.findOne({username});
        if (!user) {
            throw 'User not found in the system';
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (isCorrect) {
            req.session.user = user;
            const id = user['_id'];
            const token = jwt.sign({user_id: id}, TOKEN_SECRET, {
                expiresIn: "2h",
            });
            return res.status(201).json({
                status: 1,
                auth: true,
                token: token,
                data: {
                    user: {
                        user_id: id,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                    }
                }
            });
        }

        throw 'Incorrect username or password';
    } catch (e) {
        res.status(400).json({
            status: 0,
            auth: false,
            message: (e && Object.keys(e).length !== 0) ? e : 'Something went wrong please try again'
        });
    }
}


exports.logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.status(200).json({
            status: 1,
            auth: false,
            data: {msg: 'You have successfully logged out!'}
        });
    });
}
