import authService from "../services/authService";

module.exports = {
  handleRegister: async (req, res) => {
    try {
      let { email, password, phone } = req.body;

      if (!email || !phone || !password) {
        return res.status(200).json({
          EM: "Missing required parameters",
          EC: "1",
          DT: "",
        });
      }
      if (password && password.length < 8) {
        return res.status(200).json({
          EM: "Your password must have than 8 charter",
          EC: "1",
          DT: "",
        });
      }

      let data = await authService.registerNewUserService(req.body);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data,
      });
    } catch (e) {
      return res.status(500).json({
        EM: "error from server",
        EC: "-1",
        DT: "",
      });
    }
  },
  handleLogin: async (req, res) => {
    try {
      let data = await authService.handleLoginService(req.body);

      if (data && data.DT && data.DT.access_token) {
        res.cookie("jwt", data.DT.access_token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });
      }

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (e) {
      return res.status(500).json({
        EM: "error from server",
        EC: "-1",
        DT: "",
      });
    }
  },
};
