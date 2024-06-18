const express = require('express');
const router = express.Router();
const { getAllUsers, createNewUser, getUserById, updateUserById, deleteUserById } = require('../controllers/user.controller');

// for "/" route
router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser)

// for "/:id" route
router
    .route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

// Export the router
module.exports = router;