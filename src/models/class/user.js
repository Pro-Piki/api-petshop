// src\models\class\user.js
class user {
    constructor(id, username, password, role) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.role = role; // 'admin' o 'user'
    }
  }
  
  module.exports = user;  