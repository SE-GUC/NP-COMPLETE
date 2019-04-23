const axios = require('axios')
const reviewer = {
  default: async () => {
    return axios.get('/api/reviewers/')
  },
  createReviewer: async (data) => {
    return axios.post(`/api/reviewers/`, data)
  },
  readReviewer: async (id) => {
    return axios.get(`/api/reviewers/${id}`)
  },
  updateReviewer: async (id, data) => {
    return axios.put(`/api/reviewers/${id}`, data)
  },
  deleteReviewer: async (id) => {
    return axios.delete(`/api/reviewers/${id}`)
  },
  viewCases: async (id) => {
    return axios.get(`/api/reviewers/casesPage/${id}`)
  },
  formsToReview: async (id) => {
    return axios.get(`/api/reviewers/formsToReview/${id}`)
  },
  decideAnApplication: async (reviewerId, companyId, data) => {
    return axios.put(`/api/reviewers/decideAnApplication/${reviewerId}/${companyId}`, data)
  },
  addComment: async (reviewerId, companyId, data) => {
    return axios.put(`/api/reviewers/addComment/${reviewerId}/${companyId}`, data)
  },
  viewDepartmentTasks: async (id) => {
    return axios.get(`/api/reviewers/viewDepartmentTask/${id}`)
  },
  workPage: async (id) => {
    return axios.get(`/api/reviewers/workPage/${id}`)
  }
}
module.exports = reviewer
