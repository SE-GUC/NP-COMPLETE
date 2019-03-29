const axios = require('axios')
const task = {
  createTask: async (data) => {
    return axios.post(`http://localhost:8000/api/tasks/`, data)
  },
  viewDepartmentTask: async (data) => {
    return axios.put(`http://localhost:8000/api/tasks/viewDepartmentTask/`,data)
  }
}
module.exports = task
