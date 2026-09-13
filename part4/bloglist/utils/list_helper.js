const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0

    blogs.forEach(blog => likes += blog.likes)

    return likes
}

const favoriteBlog = (blogs) => {
    let favoriteIndex, maxLikes = -1

    blogs.forEach((blog, index) => {
        if(blog.likes > maxLikes) {
            maxLikes = blog.likes
            favoriteIndex = index
        }
    })

    if(maxLikes === -1) {
        return null
    }

    return blogs[favoriteIndex]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}