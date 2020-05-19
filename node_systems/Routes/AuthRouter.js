const express = require('express');
const router = express.Router();


const {
  login,
  register,
  
  logout,
  recover,
  reset,
  validateCookieToken,
} = require('../Controllers/AuthController.js');

const { Protected } = require('../Middleware/Protected.js');


router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.post('/recover/password', recover);
router.put('/reset/password/:token', reset);
router.get('/validate/cookie/token', Protected, validateCookieToken);

module.exports = router;