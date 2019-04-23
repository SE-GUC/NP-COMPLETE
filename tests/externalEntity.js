const axios = require('axios')
const externalEntity = {
  default: async () => {
    return axios.get('/api/externalEntities/')
  },
  createExternalEntity: async (data) => {
    return axios.post(`/api/externalEntities/`, data)
  },
  readExternalEntity: async (id) => {
    return axios.get(`/api/externalEntities/${id}`)
  },
  deleteExternalEntity: async (id) => {
    return axios.delete(`/api/externalEntities/${id}`)
  },
  updateExternalEntity: async (id, data) => {
    return axios.put(`/api/externalEntities/${id}`, data)
  }
}
module.exports = externalEntity
