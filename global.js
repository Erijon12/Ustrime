const bcrypt = require("bcryptjs");

var self;

class global_func {
  constructor() {
    self = this;
  }

  async getPasswordHash({ password }) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
}

module.exports = new global_func();
