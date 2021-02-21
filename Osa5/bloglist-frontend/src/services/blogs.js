import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async newLike => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl + '/' + newLike.id, newLike, config)
  return response.data
}

const deleteBlog = async deleteBlog => {

  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(baseUrl + '/' + deleteBlog.id, config)


}

export default { getAll, setToken, create, likeBlog, deleteBlog }