const axios = require('axios')
const task = {
  default: async () => {
    return axios.get('/api/tasks/')
  },
  createTask: async (data) => {
    return axios.post(`/api/tasks/`, data)
  },
  readTask: async (id) => {
    return axios.get(`/api/tasks/${id}`)
  },
  deleteTask: async (id) => {
    return axios.delete(`/api/tasks/${id}`)
  },
  updateTask: async (id, data) => {
    return axios.put(`/api/tasks/${id}`, data)
  },
  viewDepartmentTask: async (data) => {
    return axios.put(`/api/tasks/viewDepartmentTask/`, data)
  }
}
module.exports = task
