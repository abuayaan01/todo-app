import User from "../../models/user/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      msg: "Session expired , please login.",
      data: [],
    });
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id)

  next();
};
