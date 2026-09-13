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

const mostBlogs = (blogs) => {
    let author = '',maxBlogs = -1

    blogs.forEach((blog) => {
        const filteredBlogs = blogs.filter(b => b.author === blog.author)

        if(filteredBlogs.length > maxBlogs) {
            maxBlogs = filteredBlogs.length
            author = blog.author
        }
    })

    if(maxBlogs === -1) {
        return null
    }

    return {
        author,
        blogs: maxBlogs
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}