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
  viewCases: async (id) => {
    return axios.get(`http://localhost:8000/api/reviewers/casesPage/${id}`)
  },
  formsToReview: async (id) => {
    return axios.get(`http://localhost:8000/api/reviewers/formsToReview/${id}`)
  },
  decideAnApplication: async (reviewerId, companyId, data) => {
    return axios.put(`http://localhost:8000/api/reviewers/decideAnApplication/${reviewerId}/${companyId}`, data)
  },
  addComment: async (reviewerId, companyId, data) => {
    return axios.put(`http://localhost:8000/api/reviewers/addComment/${reviewerId}/${companyId}`, data)
  },
  viewDepartmentTasks: async (id) => {
    return axios.get(`http://localhost:8000/api/reviewers/viewDepartmentTask/${id}`)
  },
  workPage: async (id) => {
    return axios.get(`http://localhost:8000/api/reviewers/workPage/${id}`)
  }
}
module.exports = reviewer
