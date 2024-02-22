import User from "../../models/user/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({
      mssg: "Required fields are missing.",
    });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(409).send("User already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    const { password, ...userData } = user._doc;
    res.status(201).json({
      success: true,
      msg: "User Created Successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(404).send("Error registering user. ", error);
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      mssg: "Required fields are missing.",
    });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("User doesn't exist");
  }

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(484).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 60 * 60,
    })
    .json({
      success: true,
      msg: "Auth Ok",
      data: [],
    });
};

export const userDetails = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

export const logout = (req, res) => {
  res.status(200).cookie("token", "", { expires: new Date(Date.now()) }).json({
    success: true,
  });
};
