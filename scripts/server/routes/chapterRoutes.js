const express = require('express'),
    router = express.Router(),
    ChapterController = require('../controllers/chapterController');

/**
 * POST (ie CREATE)
 */
router.post("/create", ChapterController.addChapter);

/**
 * DELETE
 */
router.delete("/:chapterId", ChapterController.deleteChapter);

/**
 * DELETE
 */
router.delete("/deleteByProject/:projectId", ChapterController.deleteChaptersByProject);

/**
 * GET (ie READ)
 */
router.get("/getByProject/:projectId", ChapterController.getAllChaptersByProject);

/**
 * GET (ie READ)
 */
router.get("/getById/:chapterId", ChapterController.getChapterById);

/**
 * PUT (ie UPDATE)
 */
router.put("/updateName/:chapterId", ChapterController.updateChapterName);

/**
 * PUT (ie UPDATE)
 */
router.put("/updateContent/:chapterId", ChapterController.updateChapterContent);

module.exports = router;