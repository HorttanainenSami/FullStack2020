import axios from 'axios'

const url='http://localhost:3001/persons'

const getAll = () => {  
  const response = axios.get(url)
  return response.then(response=>response.data)
}
const create = (personObject) =>{
  const response = axios
  .post(url, personObject)
  return response.then(response=> response.data )
}
const personService = { getAll, create}
export default personService

