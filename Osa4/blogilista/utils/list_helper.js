const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>{
 const totalLikes=blogs.reduce((total, value)=>total+ value.likes, 0) //0 on total eli arvo alussa, value on juuri se blogi jota mennään läpi
 

 return totalLikes
}

const favoriteBlog = (blogs) =>{
  let bestBlog=null
  let likes=0
  
  blogs.forEach(blog=>{
    if(blog.likes>likes){
      likes=blog.likes
      bestBlog=blog
    }
  })
  
 
  return bestBlog
 }

module.exports = {
  dummy, totalLikes, favoriteBlog
}






// VAIHTOEHTOINEN LISTAN LÄPIKÄYNTITAPA
// const totalLikes=0

// blogs.forEach(blog=>totalLikes+=blog.likes)

// return totalLikes
