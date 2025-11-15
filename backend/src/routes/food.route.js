const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { createFood, getFoodItems } = require('../controllers/food.controller');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
});


// APi /api/food/ [protected]
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single('video'),createFood);
// GET API /api/food/ [protected]
router.get("/", authMiddleware.authUserMiddleware, getFoodItems);
module.exports = router