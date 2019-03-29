const axios = require('axios')
const task = {
    viewDepartmentTask: async (data) => {
        return axios.put(`http://localhost:8000/api/tasks/viewDepartmentTask/`,data)
      }
}
module.exports = task