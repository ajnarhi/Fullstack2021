import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes:0 } //tämä muutettu
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes= async(anecdote)=>{

  const object = { ...anecdote, votes:anecdote.votes+1 } //päivittyy db.jsoniin, koska otetaan ...anecdotella aikaisempi anekdootti ja päivitetään voes yhdellä
  const response = await axios.put(baseUrl+"/"+anecdote.id, object)
  return response.data
}



export default { getAll, createNew, updateVotes }