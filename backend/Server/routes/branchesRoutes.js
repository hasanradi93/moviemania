const express = require('express')

const router = express.Router()

const branchesController = require('../Controllers/branchesController');

router.route('/')
    .get(branchesController.branches)
    .post(branchesController.addBranch)

router.route('/:id')
    .delete(branchesController.deleteBranch)
    .put(branchesController.editBranch)


module.exports = router