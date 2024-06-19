import groupService from "../services/groupService"

module.exports = {
  readFC: async (req, res) => {
    try {
      let data = await groupService.getGroup();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: "error form server",
        EC: "-1",
        DT: "",
      });
    }
  },
};
