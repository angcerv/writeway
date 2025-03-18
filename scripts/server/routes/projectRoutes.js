const express = require('express'),
    router = express.Router(),
    ProjectController = require('../controllers/projectController');

/**
 * POST (ie CREATE) a new project in the collection
 */
router.post("/create", ProjectController.addProject);

/**
 * DELETE a specific project from the collection
 */
router.delete("/:projectId", ProjectController.deleteProject);

/**
 * GET (ie READ) list of a user projects in the collection
 */
router.get("/:userId", ProjectController.getAllProjectsByUser);

/**
 * GET (ie READ) a project by id in the collection
 */

router.get("/openProject/:projectId", ProjectController.getProjectById);

/**
 * GET (ie READ) tasks by project id in the collection
 */

router.get("/getTasks/:projectId", ProjectController.getTasksByProjectId);

/**
 * PUT (ie UPDATE)
 */
router.put("/updateDate/:projectId", ProjectController.updateDate);

/**
 * PUT (ie UPDATE)
 */
router.put("/addShareUser/:projectId", ProjectController.updateAddShareUsers);

/**
 * PUT (ie UPDATE)
 */
router.put("/deleteShareUser/:projectId", ProjectController.updateDeleteShareUsers);

/**
 * PUT (ie UPDATE)
 */
router.put("/addTask/:projectId", ProjectController.updateAddTask);

/**
 * PUT (ie UPDATE)
 */
router.put("/updateTasks/:projectId", ProjectController.updateTasks);

/**
 * PUT (ie UPDATE)
 */
router.put("/deleteTask/:projectId", ProjectController.updateDeleteTask);

module.exports = router;