const express = require('express'),
    router = express.Router(),
    CommentController = require('../controllers/commentController');


/**
 * POST (ie CREATE)
 */
router.post("/create", CommentController.addComment);

/**
 * DELETE
 */
router.delete("/deleteComment/:commentId", CommentController.deleteComment);

/**
 * GET (ie READ)
 */
router.get("/getByProject/:projectId", CommentController.getAllCommentsByProject);

module.exports = router;