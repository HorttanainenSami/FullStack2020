import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const config = () => {
  const header = {
    headers: { Authorization: token },
  }
  return header
}
const getAll = () => {
  const result = axios.get(baseUrl)
  return result.then(response => response.data)
}
const create = async (newObject) => {
  const result = await axios.post(baseUrl, newObject, config())
  return result.data
}
const remove = async (id) => {
  const result = await axios.delete(`${baseUrl}/${id}`, config())
  return result.data
}

const update = async (newObject) => {
  const result = await axios.put(baseUrl+'/'+newObject.id, newObject, config())
  return result.data
}

export default { getAll, create, setToken, update, remove }
