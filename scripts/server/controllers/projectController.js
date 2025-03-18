const mongoose = require("mongoose"),
	{ ObjectId } = require('mongoose').Types.ObjectId,
	Project = require("../models/Project");

/** JS FILES **/
const { getCurrentDate } = require('../../utils/utils');

/** CREATE **/
exports.addProject = (req, res, next) => {
	Project.find({ projectName: req.body.projectName })
		.exec()
		.then(project => {
			if (project.length >= 1) {
				return res.status(409).json({
					message: "Project exists"
				});
			} else {
				var currentDate = getCurrentDate();
				const project = new Project({
					_id: new mongoose.Types.ObjectId(),
					projectName: req.body.projectName,
					userId: req.body.userId,
					lastModified: currentDate,
					shareUsers: req.body.shareUsers,
					tasks: []
				});
				project.save()
					.then(result => {
						res.status(201).json({
							message: "Project created"
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
};

/** DELETE **/
exports.deleteProject = (req, res, next) => {
    Project.deleteOne({ _id: req.params.projectId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Project deleted"
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
exports.getAllProjectsByUser = (req, res, next) => {
	Project.find({ shareUsers: { $elemMatch: { userId: req.params.userId } } })
	.exec()
	.then(docs => {
		const response = 
			docs.map(doc => {
				return {
					_id: doc._id,
					projectName: doc.projectName,
					lastModified: doc.lastModified,
					shareUsers: doc.shareUsers,
					tasks: doc.tasks
				};
			});
		
		res.status(200).json(response);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.getProjectById = (req, res, next) => {
	Project.findOne({ _id: new ObjectId(req.params.projectId) })
	.exec()
	.then(doc => {
		const response = {
			_id: doc._id,
			projectName: doc.projectName,
			userId: doc.userId,
			shareUsers: doc.shareUsers,
			tasks: doc.tasks
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

exports.getTasksByProjectId = (req, res, next) => {
	Project.findOne({ _id: new ObjectId(req.params.projectId) })
	.exec()
	.then(doc => {
		const response = {
			tasks: doc.tasks
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

/** UPDATE **/
exports.updateDate = (req, res, next) => {
    Project.updateOne({ _id: req.params.projectId }, {
        $set: {
            lastModified: req.body.lastModified
        }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Project updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.updateAddShareUsers = (req, res, next) => {
    Project.updateOne({ _id: req.params.projectId }, {
        $addToSet: { shareUsers: req.body.newUserId }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Project updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.updateDeleteShareUsers = (req, res, next) => {
    Project.updateOne({ _id: req.params.projectId }, {
        $pull: { shareUsers: { userId: req.body.userToRemove } }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Project updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.updateAddTask = (req, res, next) => {
    Project.updateOne({ _id: req.params.projectId }, {
        $addToSet: { tasks: req.body.newTask }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Project updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.updateDeleteTask = (req, res, next) => {
    Project.updateOne({ _id: req.params.projectId }, {
        $pull: { tasks: req.body.taskToRemove }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Project updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.updateTasks = (req, res, next) => {
    Project.updateOne({ _id: req.params.projectId }, {
        $set: {
            tasks: req.body.tasks
        }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Project updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}