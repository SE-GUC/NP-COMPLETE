const axios = require('axios')
const lawyer = {
  default: async () => {
    return axios.get('http://localhost:8000/api/lawyers/')
  },
  createLawyer: async (data) => {
    return axios.post(`http://localhost:8000/api/lawyers/`, data)
  },
  readLawyer: async (id) => {
    return axios.get(`http://localhost:8000/api/lawyers/${id}`)
  },
  deleteLawyer: async (id) => {
    return axios.delete(`http://localhost:8000/api/lawyers/${id}`)
  },
  updateLawyer: async (id, data) => {
    return axios.put(`http://localhost:8000/api/lawyers/${id}`, data)
  },
  FillForm: async (data) => {
    return axios.post(`http://localhost:8000/api/lawyers/newForm`, data)
  }

}
module.exports = lawyer
