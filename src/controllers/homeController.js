import userService from "../services/userService"
module.exports = {
  handleHelloWord: (req, res) => {
    return res.render("home");
  },
  handleUserPage: (req, res) => {
    return res.render("user.ejs");
  },
  handleCreateUser: (req, res) => {
    let { email, password, username } = req.body;
    userService.createNewUser(email, password, username)
    return res;
  },
};

// export const handleHelloWord = (req, res) => {
//   return res.render("home");
// };
