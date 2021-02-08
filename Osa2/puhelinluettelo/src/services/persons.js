import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}


const deletePerson = (id)  => {
  return axios.delete(`${baseUrl}/${id}`)

}

const replaceOldNumber = (id, name, number) => {
  return axios.put(`${baseUrl}/${id}`,   {
    "name": name,
    "number": number,
    "id": id
  },)
}

export default { 
  getAll: getAll, 
  create: create, 
  replaceOldNumber: replaceOldNumber, 
  deletePerson : deletePerson
}