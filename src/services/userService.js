import bcrypt from "bcryptjs";
import db from "../models";
import { where } from "sequelize/lib/sequelize";

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
        offset,
        limit,
      });
      let totalPages = Math.ceil(count / limit);
      let data = {
        totalRows: count,
        totalPages,
        users: rows,
      };

      return {
        EM: "oke",
        EC: 0,
        DT: data,
      };
    } catch (e) {}
  },
  createNewUser: async () => {
    try {
      let users = await db.User.create({});
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
  UpdateAUser: async (data) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.save({});
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
  deleteAUser: async (id) => {
    try {
      let user = await db.User.delete({
        where: { id },
      });
      if (user) {
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
};
