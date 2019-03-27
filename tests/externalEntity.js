const axios = require('axios')
const externalEntity = {
    default: async () => {
      return axios.get('http://localhost:8000/api/externalEntities/')
    },
    createExternalEntity: async (data) => {
      return axios.post(`http://localhost:8000/api/externalEntities/`, data)
    },
    readExternalEntity: async (id) => {
      return axios.get(`http://localhost:8000/api/externalEntities/${id}`)
    },
    deleteExternalEntity: async (id) => {
      return axios.delete(`http://localhost:8000/api/externalEntities/${id}`)
    },
    updateExternalEntity: async (id) => {
        return axios.put(`http://localhost:8000/api/externalEntities/${id}`)
      }
  }
  module.exports = externalEntity