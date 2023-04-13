const express = require('express');
const router = express.Router();

const { SignIn, SignUp } = require('../controllers/user');

router.post('/signin', SignIn);
router.post('/signup', SignUp);

module.exports = router;