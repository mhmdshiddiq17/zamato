const foodPartnerModel = require('../models/foodPartner.model');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authFoodPartnerMiddleware = async (req, res, next) => { 
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
   }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;
    next();
  } catch (err) { 
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = {authFoodPartnerMiddleware, authUserMiddleware};