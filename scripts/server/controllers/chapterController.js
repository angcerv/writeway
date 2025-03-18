const mongoose = require("mongoose"),
    Chapter = require("../models/Chapter");

/** CREATE **/
exports.addChapter = (req, res, next) => {
    Chapter.find({ chapterName: req.body.chapterName })
        .exec()
        .then(chapter => {
            if (chapter.length >= 1) {
                return res.status(409).json({
                    message: "Chapter exists"
                });
            } else {
                const chapter = new Chapter({
                    _id: new mongoose.Types.ObjectId(),
                    chapterName: req.body.chapterName,
                    projectId: req.body.projectId,
                    content: req.body.content
                });
                chapter.save()
                    .then(result => {
                        res.status(201).json({
                            message: "Chapter created"
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
exports.deleteChapter = (req, res, next) => {
    Chapter.deleteOne({ _id: req.params.chapterId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Chapter deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.deleteChaptersByProject = (req, res, next) => {
    Chapter.deleteMany({ projectId: req.params.projectId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Chapters deleted"
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
exports.getAllChaptersByProject = (req, res, next) => {
	Chapter.find({ projectId: req.params.projectId })
	.exec()
	.then(docs => {
		const response = 
			docs.map(doc => {
				return {
					_id: doc._id,
					chapterName: doc.chapterName,
                    projectId: doc.projectId,
                    content: doc.content
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

exports.getChapterById = (req, res, next) => {
	Chapter.findOne({ _id: req.params.chapterId })
	.exec()
	.then(doc => {
		const response = {
			_id: doc._id,
            chapterName: doc.chapterName,
            projectId: doc.projectId,
            content: doc.content
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
exports.updateChapterName = (req, res, next) => {
    Chapter.updateOne({ _id: req.params.chapterId }, {
        $set: {
            chapterName: req.body.chapterName
        }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Template updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.updateChapterContent = (req, res, next) => {
    Chapter.updateOne({ _id: req.params.chapterId }, {
        $set: {
            content: req.body.content
        }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Template updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}