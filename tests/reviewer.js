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
  deleteReviewer: async (id) => {
    return axios.delete(`http://localhost:8000/api/reviewers/${id}`)
  },
  viewCases: async (id) => {
    return axios.get(`http://localhost:8000/api/reviewers/casesPage/${id}`)
  },
  formsToReview: async (id) => {
    return axios.get(`http://localhost:8000/api/reviewers/formsToReview/${id}`)
  }
}
module.exports = reviewer
