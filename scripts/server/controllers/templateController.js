const mongoose = require("mongoose"),
    Template = require("../models/Template");

/** CREATE **/
exports.addTemplate = (req, res, next) => {
    const template = new Template({
        _id: new mongoose.Types.ObjectId(),
        templateName: req.body.templateName,
        projectId: req.body.projectId,
        attributes: req.body.attributes
    });
    template.save()
        .then(result => {
            res.status(201).json({
                message: "Template created"
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
exports.deleteTemplate = (req, res, next) => {
    Template.deleteOne({ _id: req.params.templateId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Template deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.deleteTemplatesByProject = (req, res, next) => {
    Template.deleteMany({ projectId: req.params.projectId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Templates deleted"
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
exports.getAllTemplatesByProject = (req, res, next) => {
    Template.find({ projectId: req.params.projectId })
    .exec()
    .then(docs => {
        const response = 
            docs.map(doc => {
                return {
                    _id: doc._id,
                    templateName: doc.templateName,
                    projectId: doc.projectId,
                    attributes: doc.attributes
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

exports.getTemplateById = (req, res, next) => {
    Template.findOne({ _id: req.params.templateId })
    .exec()
    .then(doc => {
        const response = 
            {
                _id: doc._id,
                templateName: doc.templateName,
                projectId: doc.projectId,
                attributes: doc.attributes
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
exports.updateTemplateAttributes = (req, res, next) => {
    Template.updateOne({ _id: req.params.templateId }, {
        $set: {
            attributes: req.body.attributes
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

exports.updateTemplateName = (req, res, next) => {
    Template.updateOne({ _id: req.params.templateId }, {
        $set: {
            templateName: req.body.templateName
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