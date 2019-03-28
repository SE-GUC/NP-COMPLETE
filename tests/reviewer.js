const axios = require('axios')
const reviewer = {
  default: async () => {
    return axios.get('http://localhost:8000/api/reviewers/')
  },
  createReviewer: async (data) => {
    return axios.post(`http://localhost:8000/api/reviewers/`, data)
  },
  readReviewer: async (id) => {
    return axios.get(`http://localhost:8000/api/reviewers/${id}`)
  },
  updateReviewer: async (id, data) => {
    return axios.put(`http://localhost:8000/api/reviewers/${id}`, data)
  },
  deleteReviewer: async (id) => {
    return axios.delete(`http://localhost:8000/api/reviewers/${id}`)
  },
  decideAnApplication: async (reviewerId, companyId, data) => {
    return axios.put(`http://localhost:8000/api/reviewers/decideAnApplication/${reviewerId}/${companyId}`, data)
  }
}
module.exports = reviewer
