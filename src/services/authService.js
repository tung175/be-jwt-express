import bcrypt from "bcryptjs";
import db from "../models/index";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const checkEmail = async (userEmail) => {
  let isExist = await db.User.findOne({ where: { email: userEmail } });
  if (isExist) {
    return true;
  }
  return false;
};

const checkPhone = async (userPhone) => {
  let isExist = await db.User.findOne({ where: { phone: userPhone } });
  if (isExist) {
    return true;
  }
  return false;
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const handleHashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const registerNewUserService = async (data) => {
  try {
    //check email/phone are exist
    let isEmailExist = await checkEmail(data.email);

    if (isEmailExist === true) {
      return {
        EM: "The Email is already exist",
        EC: 1,
        DT: "",
      };
    }
    let isPhoneExist = await checkPhone(data.phone);

    if (isPhoneExist === true) {
      return {
        EM: "The Phone is already exist",
        EC: 1,
        DT: "",
      };
    }
    //hash password
    let hashPassword = handleHashPassword(data.password);
    //create a new user
    let { email, password, username, phone } = data;

    await db.User.create({
      email,
      password: hashPassword,
      username,
      phone,
    });

    return {
      EM: "A user is created successfully",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error form service",
      EC: -1,
      DT: "",
    };
  }
};

const handleLoginService = async (data) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: data.valueLogin }, { phone: data.valueLogin }],
      },
    });

    if (user) {
      let isPassword = checkPassword(data.password, user.password);
      if (isPassword === true) {
        return {
          EM: "ok",
          EC: 0,
          DT: "",
        };
      }
    }
    return {
      EM: "Your email or phone is incorrect",
      EC: 1,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Error form service",
      EC: -1,
    };
  }
};

module.exports = {
  handleHashPassword,
  registerNewUserService,
  handleLoginService,
  checkEmail,
  checkPhone,
  checkPassword,
};
