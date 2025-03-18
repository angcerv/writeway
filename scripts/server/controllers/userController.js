const mongoose = require("mongoose"),
	bcrypt = require("bcrypt"),
	jwt = require("jsonwebtoken"),
    User = require("../models/User");
    
/** CREATE **/
exports.loginUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "El usuario introducido no existe."
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Contraseña incorrecta."
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id,
                            username: user[0].username,
                            authorname: user[0].authorname
                        },
                        "sssh"
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Contraseña incorrecta."
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.signUpUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            username: req.body.username,
                            authorname: req.body.authorname
                        });
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};

/** DELETE **/
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

/** GET **/
exports.getAllUsers = (req, res, next) => {
	User.find()
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			users: docs.map(doc => {
				return {
					_id: doc._id,
					email: doc.email,
					password: doc.password,
					username: doc.username,
					authorname: doc.authorname
				};
			})
		};
		res.status(200).json(response);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.getUserById = (req, res, next) => {
	User.findOne({ _id: req.params.userId })
	.exec()
	.then(doc => {
		const response = {
			_id: doc._id,
            email: doc.email,
            username: doc.username
		};
		res.status(200).json(response);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.getUserByEmail = (req, res, next) => {
	User.find({ email: req.params.email })
	.exec()
	.then(doc => {
        if (doc.length < 1) {
            return res.status(404).json({
                message: "El correo introducido no existe.",
                isFound: false
            });
        }
		const response = {
			_id: doc[0]._id,
            email: doc[0].email,
            username: doc[0].username,
            isFound: true
		};
		res.status(200).json(response);
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
}

/** UPDATE **/
exports.updateUsername = (req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.userId }, {
        $set: {
            username: req.body.username
        }
    }, {useFindAndModify: false})
    .exec()
    .then(doc => {
        const token = jwt.sign(
            {
                email: doc.email,
                userId: doc._id,
                username: req.body.username,
                authorname: doc.authorname
            },
            "sssh"
        );
        res.status(200).json({
            message: "User updated",
            token: token
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.updateAuthorname = (req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.userId }, {
        $set: {
            authorname: req.body.authorname
        }
    }, {useFindAndModify: false})
    .exec()
    .then(doc => {
        const token = jwt.sign(
            {
                email: doc.email,
                userId: doc._id,
                username: doc.username,
                authorname: req.body.authorname
            },
            "sssh"
        );
        res.status(200).json({
            message: "User updated",
            token: token
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.updateUserPassword = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            User.findOneAndUpdate({ _id: req.params.userId }, {
                $set: {
                    password: hash
                }
            }, {useFindAndModify: false})
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: "User updated"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    });
}