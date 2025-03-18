const express = require('express'),
    router = express.Router(),
    checkAuth = require('../middleware/check-auth'),
    UserController = require('../controllers/userController');


/**
 * POST (ie CREATE) a new user in the collection
 */
router.post("/signup", UserController.signUpUser);

/**
 * POST (ie CREATE) a token for the user to authenticate use of the API's with protected routes
 */
router.post("/login", UserController.loginUser);

/**
 * DELETE a specific user from the collection
 * Requires authentication
 */
router.delete("/:userId", checkAuth, UserController.deleteUser);

/**
 * GET (ie READ) list of all users in the collection
 */
router.get("/userbyId/:userId", UserController.getUserById);

/**
 * GET (ie READ) list of all users in the collection
 */
router.get("/userByEmail/:email", UserController.getUserByEmail);

/**
 * PUT (ie UPDATE)
 */
router.put("/updateUsername/:userId", UserController.updateUsername);

/**
 * PUT (ie UPDATE)
 */
router.put("/updateAuthorname/:userId", UserController.updateAuthorname);

/**
 * PUT (ie UPDATE)
 */
router.put("/updatePassword/:userId", UserController.updateUserPassword);

module.exports = router;