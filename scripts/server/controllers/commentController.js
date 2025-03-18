const mongoose = require("mongoose"),
    Comment = require("../models/Comment");


/** CREATE **/
exports.addComment = (req, res, next) => {
    const comment = new Comment({
		_id: new mongoose.Types.ObjectId(),
		commentAuthor: req.body.commentAuthor,
		commentMessage: req.body.commentMessage,
		projectId: req.body.projectId,
		date: req.body.date
	});
	comment.save()
		.then(result => {
			res.status(201).json({
				message: "Comment created"
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
		});
	});
};

/** DELETE **/
exports.deleteComment = (req, res, next) => {
    Comment.deleteOne({ _id: req.params.commentId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Comment deleted"
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
exports.getAllCommentsByProject = (req, res, next) => {
	Comment.find({ projectId: req.params.projectId })
	.exec()
	.then(docs => {
		const response = 
			docs.map(doc => {
				return {
					_id: doc._id,
					commentAuthor: doc.commentAuthor,
					commentMessage: doc.commentMessage,
					date: doc.date
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