import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const result = axios.get(baseUrl)
  return result.then(response => response.data)
}
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const result = await axios.post(baseUrl, newObject, config)
  return result.data
}

export default { getAll, create, setToken }
