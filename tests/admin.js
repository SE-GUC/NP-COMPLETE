const axios = require('axios')
const admin = {
  default: async () => {
    return axios.get('http://localhost:8000/api/admins/')
  },
  createAdmin: async (data) => {
    return axios.post(`http://localhost:8000/api/admins/`, data)
  },
  updateAdmin: async (id, data) => {
    return axios.put(`http://localhost:8000/api/admins/${id}`, data)
  },
  readAdmin: async (id) => {
    return axios.get(`http://localhost:8000/api/admins/${id}`)
  },
  deleteAdmin: async (id) => {
    return axios.delete(`http://localhost:8000/api/admins/${id}`)
  },
  viewCases: async (id) => {
    return axios.get(`http://localhost:8000/api/admins/viewCases/${id}`)
  },
  viewDepartmentTasks: async (id) => {
    return axios.get(`http://localhost:8000/api/admins/viewDepartmentTask/${id}`)
    
  }
}
module.exports = admin
