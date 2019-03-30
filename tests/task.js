const axios = require('axios')
const task = {
  default: async () => {
    return axios.get('http://localhost:8000/api/tasks/')
  },
  createTask: async (data) => {
    return axios.post(`http://localhost:8000/api/tasks/`, data)
  },
  readTask: async (id) => {
    return axios.get(`http://localhost:8000/api/tasks/${id}`)
  },
  deleteTask: async (id) => {
    return axios.delete(`http://localhost:8000/api/tasks/${id}`)
  },
  updateTask: async (id, data) => {
    return axios.put(`http://localhost:8000/api/tasks/${id}`, data)
  },
  viewDepartmentTask: async (data) => {
    return axios.put(`http://localhost:8000/api/tasks/viewDepartmentTask/`, data)
  }
}
module.exports = task
