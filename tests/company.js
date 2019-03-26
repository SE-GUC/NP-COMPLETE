const axios = require('axios')
const company = {
  readCompany: async (id) => {
    return axios.get(`http://localhost:8000/api/companies/${id}`)
  }
}
module.exports = company
