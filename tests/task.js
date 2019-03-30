const axios = require('axios')
const task = {
  viewDepartmentTask: async (data) => {
    return axios.put(`http://localhost:8000/api/tasks/viewDepartmentTask/`, data)
  },
  createTask: async (data) => {
    return axios.post(`http://localhost:8000/api/tasks/`, data)
  }
}
module.exports = task
