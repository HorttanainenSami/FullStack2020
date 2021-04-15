import axios from 'axios'

const url='http://localhost:3001/persons'

const getAll = () => {  
  const response = axios.get(url)
  const nonExist = {
    name:'Not on server',
    number:'12345',
    id:10000,
  }
  return response.then(response=>response.data.concat(nonExist))
}
const create = (personObject) =>{
  const response = axios
  .post(url, personObject)
  return response.then(response=> response.data )
}
const update = (personObject, id) =>{
  const response = axios
  .put(`${url}/${id}`, personObject)
  return response.then(response=>response.data)
}
const remove = (id) => {

  const response = axios
  .delete(`${url}/${id}`)
  return response.then(response=>response)

}
const personService = { getAll, create, remove, update}
export default personService

