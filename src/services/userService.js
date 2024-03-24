import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);


module.exports = {
    hashPassword: (password) => {
    return bcrypt.hashSync(password, salt);
    },
    createNewUser: (email, password, username) => {
        let hashPassword = hashPassword(password)
        return
    },
    getListUser: () => {

    }
}