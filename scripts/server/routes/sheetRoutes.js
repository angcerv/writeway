const express = require('express'),
    router = express.Router(),
    SheetController = require('../controllers/sheetController');

/**
 * POST (ie CREATE)
 */
router.post("/create", SheetController.addSheet);

/**
 * DELETE
 */
router.delete("/:sheetId", SheetController.deleteSheet);

/**
 * DELETE
 */
router.delete("/deleteByProject/:projectId", SheetController.deleteSheetsByProject);

/**
 * GET (ie READ)
 */
router.get("/sheetsByProject/:projectId", SheetController.getAllSheetsByProject);

/**
 * GET (ie READ)
 */
router.get("/sheetsByTemplate/:templateId", SheetController.getAllSheetsByTemplate);

/**
 * PUT (ie UPDATE) a user
 */
router.put("/updateFeatures/:sheetId", SheetController.updateSheetFeatures);

/**
 * PUT (ie UPDATE) a user
 */
router.put("/updateName/:sheetId", SheetController.updateSheetName);

/**
 * PUT (ie UPDATE) a user
 */
router.put("/addAttribute/:templateId", SheetController.updateSheetsByTemplateAddAttribute);

/**
 * PUT (ie UPDATE) a user
 */
router.put("/removeAttribute/:templateId", SheetController.updateSheetsByTemplateRemoveAttribute);

module.exports = router;