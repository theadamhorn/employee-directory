import axios from "axios";

export default {
  getUsers: function () {
    return axios.get("https://randomuser.me/api/?nat=us&results=100&inc=name,email,phone,picture,id");
  }
};
