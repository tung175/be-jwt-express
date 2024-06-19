import bcrypt from "bcryptjs";
import db from "../models";
import { where } from "sequelize/lib/sequelize";
import { checkEmail, checkPhone, handleHashPassword } from "./authService";

const salt = bcrypt.genSaltSync(10);

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, salt);
  },
  createNewUser: (email, password, username) => {
    let hashPassword = hashPassword(password);
    return;
  },
  getAllUser: async () => {
    try {
      let users = await db.User.findAll({
        attributes: ["id", "username", "email", "phone", "sex"],
        include: { model: db.Group, attributes: ["name", "description"] },
      });
      if (users) {
        return {
          EM: "Get data success",
          EC: 0,
          DT: users,
        };
      } else {
        return {
          EM: "Get data false",
          EC: -1,
          DT: [],
        };
      }
    } catch (e) {
      console.log(e);
      return {
        EM: "something wrongs with service",
        EC: 1,
        DT: [],
      };
    }
  },
  getUserWithPaginate: async (page, limit) => {
    try {
      let offset = (page - 1) * limit;

      const { rows, count } = await db.User.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "username", "email", "phone", "sex", "address"],
        include: { model: db.Group, attributes: ["name", "description", "id"] },
        order: [["id", "DESC"]]
      });

      let totalPages = Math.ceil(count / limit);
      let data = {
        totalRows: count,
        totalPages: totalPages,
        users: rows,
      };

      return {
        EM: "fetch oke",
        EC: 0,
        DT: data,
      };
    } catch (e) {
      return {
        EM: "something wrongs with service",
        EC: 1,
        DT: [],
      };
    }
  },
  createANewUser: async (data) => {
    try {
      let isEmailExist = await checkEmail(data.email);
      if (isEmailExist === true) {
        return {
          EM: "The Email is already exist",
          EC: 1,
          DT: "email",
        };
      }

      let isPhoneExist = await checkPhone(data.phone);
      if (isPhoneExist === true) {
        return {
          EM: "The Phone is already exist",
          EC: 1,
          DT: "phone",
        };
      }

      let hashPassword = handleHashPassword(data.password);

      let users = await db.User.create({ ...data, password: hashPassword });
      if (users) {
        return {
          EM: "create user success",
          EC: 0,
          DT: [],
        };
      } else {
        return {
          EM: "create user false",
          EC: -1,
          DT: [],
        };
      }
    } catch (e) {
      console.log(e);
      return {
        EM: "something wrongs with service",
        EC: 1,
        DT: [],
      };
    }
  },
  UpdateAUser: async (data) => {
    try {
      if (!data.groupId) {
        return {
          EM: "Error with empty GroupId",
          EC: 1,
          DT: "group",
        }
      }
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.update({
          username: data.username,
          address: data.address,
          sex: data.sex,
          groupId: data.groupId
        });
        return {
          EM: "update data success",
          EC: 0,
          DT: "",
        };
      } else {
        return {
          EM: "Not find user",
          EC: 2,
          DT: "",
        };
      }
    } catch (e) {
      console.log(e);
      return {
        EM: "something wrongs with service",
        EC: 1,
        DT: [],
      };
    }
  },
  deleteAUser: async (id) => {
    try {
      let user = await db.User.findOne({
        where: { id },
      });
      if (user) {
        await user.destroy();
        return {
          EM: "Delete user success",
          EC: 0,
          DT: [],
        };
      } else {
        return {
          EM: "User not exist",
          EC: 2,
          DT: [],
        };
      }
    } catch (e) {
      console.log(e);
      return {
        EM: "something wrongs with service",
        EC: 1,
        DT: [],
      };
    }
  },
};
