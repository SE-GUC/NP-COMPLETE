const axios = require('axios')
const reviewer = {
  createReviewer: async (data) => {
    return axios.post(`http://localhost:8000/api/reviewers/`, data)
  }
}
module.exports = reviewer
