const axios = require('axios')
const lawyer = {
  createLawyer: async (data) => {
    return axios.post(`http://localhost:8000/api/lawyers/`, data)
  }
}
module.exports = lawyer
