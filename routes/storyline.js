const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const {
    createWhodunitStoryline, getAllWhodunitStorylines,
    RandomlySelectPuzzle, CheckSolutionAndAccuracy,
    getNextQuestion, getAllUserData
} = require('../controllers/storyline');

router.post('/whodunit/create', createWhodunitStoryline);
router.get('/whodunit/getall', getAllWhodunitStorylines);
router.get('/puzzle/random', auth, RandomlySelectPuzzle);
router.post('/puzzle/check', auth, CheckSolutionAndAccuracy);
router.get('/puzzle/next', auth, getNextQuestion);
router.get('/solved/all', getAllUserData);

module.exports = router;