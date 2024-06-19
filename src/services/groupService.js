import db from "../models";

const getGroup = async () => {
    try {
        let data = await db.Group.findAll({
         order: [['name', 'ASC']]
        });
        if (data) {
          return {
            EM: "Get data success",
            EC: 0,
            DT: data,
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
}

module.exports = {
    getGroup
}