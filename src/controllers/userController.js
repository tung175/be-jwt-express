import userService from "../services/userService";
module.exports = {
  readFC: async (req, res) => {
    try {
      if (req.query.page && req.query.limit) {
        let { page, limit } = req.query;
        let data = await userService.getUserWithPaginate(+page, +limit);
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: data.DT,
        });
      } else {
        let data = await userService.getAllUser();
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: data.DT,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: "",
        EC: "-1",
        DT: "",
      });
    }
  },
  createFC: async (req, res) => {
    try {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: "",
        EC: "-1",
        DT: "",
      });
    }
  },
  updateFC: async (req, res) => {
    try {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: "",
        EC: "-1",
        DT: "",
      });
    }
  },
  deleteFC: async (req, res) => {
    try {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: "",
        EC: "-1",
        DT: "",
      });
    }
  },
};
