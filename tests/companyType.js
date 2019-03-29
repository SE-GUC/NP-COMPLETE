const axios = require('axios')
const companyType = {
  createCompanyType: async (data) => {
    return axios.post(`http://localhost:8000/api/companyTypes/`, data)
  }
}
module.exports = companyType
