const mongoose = require("mongoose"),
    Sheet = require("../models/Sheet");

/** CREATE **/
exports.addSheet = (req, res, next) => {
    const sheet = new Sheet({
        _id: new mongoose.Types.ObjectId(),
        sheetName: req.body.sheetName,
        projectId: req.body.projectId,
        templateId: req.body.templateId,
        features: req.body.features
    });
    sheet.save()
        .then(result => {
            res.status(201).json({
                message: "Sheet created"
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
exports.deleteSheet = (req, res, next) => {
    Sheet.deleteOne({ _id: req.params.sheetId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Sheet deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.deleteSheetsByProject = (req, res, next) => {
    Sheet.deleteMany({ projectId: req.params.projectId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Sheets deleted"
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
exports.getAllSheetsByProject = (req, res, next) => {
    Sheet.find({ projectId: req.params.projectId })
    .exec()
    .then(docs => {
        const response = 
            docs.map(doc => {
                return {
                    _id: doc._id,
                    projectId: doc.projectId,
                    sheetName: doc.sheetName,
                    templateId: doc.templateId,
                    features: doc.features
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

exports.getAllSheetsByTemplate = (req, res, next) => {
    Sheet.find({ templateId: req.params.templateId })
    .exec()
    .then(docs => {
        const response = 
            docs.map(doc => {
                return {
                    _id: doc._id,
                    projectId: doc.projectId,
                    sheetName: doc.sheetName,
                    templateId: doc.templateId,
                    features: doc.features
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

/** UPDATE **/
exports.updateSheetFeatures = (req, res, next) => {
    Sheet.updateOne({ _id: req.params.sheetId }, {
        $set: {
            features: req.body.features
        }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Sheet updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.updateSheetName = (req, res, next) => {
    Sheet.updateOne({ _id: req.params.sheetId }, {
        $set: {
            sheetName: req.body.sheetName
        }
    })
	.exec()
	.then(doc => {
        res.status(200).json({
            message: "Sheet updated"
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.updateSheetsByTemplateAddAttribute = (req, res, next) => {
    Sheet.updateMany({ templateId: req.params.templateId }, 
        { $addToSet: { features: req.body.newAttribute } }
    )
    .exec()
    .then(doc => {
        res.status(200).json({
            message: "Sheet updated"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.updateSheetsByTemplateRemoveAttribute = (req, res, next) => {
    Sheet.updateMany({ templateId: req.params.templateId }, 
        { $pull: { features: { attribute: req.body.attributeToDelete } }  }
    )
    .exec()
    .then(doc => {
        res.status(200).json({
            message: "Sheet updated"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}