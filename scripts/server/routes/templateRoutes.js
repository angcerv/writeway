const express = require('express'),
    router = express.Router(),
    TemplateController = require('../controllers/templateController');

/**
 * POST (ie CREATE)
 */
router.post("/create", TemplateController.addTemplate);

/**
 * DELETE
 */
router.delete("/:templateId", TemplateController.deleteTemplate);

/**
 * DELETE
 */
router.delete("/deleteByProject/:projectId", TemplateController.deleteTemplatesByProject);

/**
 * GET (ie READ)
 */
router.get("/:projectId", TemplateController.getAllTemplatesByProject);

/**
 * GET (ie READ)
 */
router.get("/getOneTemplate/:templateId", TemplateController.getTemplateById);

/**
 * PUT (ie UPDATE) a user
 */
router.put("/updateAttributes/:templateId", TemplateController.updateTemplateAttributes);

/**
 * PUT (ie UPDATE) a user
 */
router.put("/updateName/:templateId", TemplateController.updateTemplateName);

module.exports = router;