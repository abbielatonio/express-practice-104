var uuid = require("uuid");

class UsersService {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }


  
  getSingleUser(userId) {
    var user = this.users.filter((user) => user.id === userId)[0];

    return user || null;
  }




  addUser(info) {

    if (!info || this.users.filter((user) => user.email === info.email).length > 0) {
      // prevent a bit of bad/duplicate email
      return null;
    }
    if (!info.email.includes("@")) {
      // prevent no @ in email
      return null;
    }
    info.id = uuid.v4();

    const filteredInfo = (({id, firstName,lastName,email})=>({id, firstName,lastName,email}))(info);
    // filter keys
    this.users.push(filteredInfo);

    return info;
  }




  updateUser(userId, info) {
    var user = this.getSingleUser(userId);
    if (user) {
      user.firstName = info.firstName ? info.firstName : user.firstName;
      user.lastName = info.lastName ? info.lastName : user.lastName;
      user.email = info.email ? info.email : user.email;

      return true;
    }
    return false;
  }




  deleteUser(userId, info) {
    var user = this.getSingleUser(userId);
    const userToDelete = this.users.find((user) => user.id === userId);

    const index = this.users.indexOf(userToDelete);

    if (user) {
      this.users.splice(index, 1);

      return true;
    }
    return false;
  }
}

module.exports = new UsersService();
