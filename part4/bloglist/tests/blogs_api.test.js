const supertest = require('supertest')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app.js')
const Blog = require('../models/blog.js')

const api = supertest(app)

const newBlog = {
    title: "Tuzic",
    author: "Volcu",
    url: "https://reactpdasdsadsaatterns.com/",
    likes: 696
}

const newBlogWithoutLikes = {
    title: "Tuzic",
    author: "Volcu",
    url: "https://reactpdasdsadsaatterns.com/"
}

const newBlogWithoutTitle = {
    author: "Volcu",
    url: "https://reactpdasdsadsaatterns.com/",
    likes: 696
}

const newBlogWithoutUrl = {
    title: "Tuzic",
    author: "Volcu",
    likes: 696
}

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObj = initialBlogs.map(blog => new Blog(blog))
    const promiseArr = blogObj.map(blog => blog.save())
    await Promise.all(promiseArr)
})

test('Verify that app returns the correct amount of blog posts in json format', async () => {
    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, 6)
    assert.match(res.header['content-type'], /application\/json/)
})

test('Verify that app returns the unique identifier named id, not _id', async () => {
    const res = await api.get('/api/blogs')
    const blogs = res.body

    blogs.forEach(blog => {
        assert.ok(blog.id !== undefined)
        assert.strictEqual(blog._id, undefined)
    })
})

test('Verify that app creates succesfully a new blog post', async () => {
    const res = await api.post('/api/blogs').send(newBlog)
    const returnedBlog = res.body.blog

    const { id, ...blogWithoutId } = returnedBlog

    assert.deepStrictEqual(blogWithoutId, newBlog)
})

test('Verify that if the likes property is missing, it defaults to 0', async () => {
    const res = await api.post('/api/blogs').send(newBlogWithoutLikes)
    const returnedBlog = res.body.blog

    const { id, ...blogWithoutId } = returnedBlog

    assert.deepStrictEqual(blogWithoutId,{
        title: "Tuzic",
        author: "Volcu",
        url: "https://reactpdasdsadsaatterns.com/",
        likes: 0
    })
})

// test.only('Verify that if the title or url properties are missing, server responds with 400', async () => {
//     await api.post('/api/blogs')
// })

describe('Verify the POST endpoint ', () => {
    test('when title is missing, server responds with 400', async () => {
        const res = await api.post('/api/blogs').send(newBlogWithoutTitle)
        assert.strictEqual(res.status, 400)
    })

    test('when url is missing, server responds with 400', async () => {
        const res = await api.post('/api/blogs').send(newBlogWithoutUrl)
        assert.strictEqual(res.status, 400)
    })
})

describe('Verify the DELETE endpoint', () => {
    test('when the id is in incorrect format', async () => {
        const res = await api.delete('/api/blogs/2344343')
        assert.strictEqual(res.status, 400)
    })

    test('when it is given to delete a non existent blog', async () => {
        const res = await api.delete('/api/blogs/6aa194f95c354532296718ab')
        assert.strictEqual(res.status, 404)
    })

    test('when there occurs a normal delete req', async () => {
        const res = await api.delete('/api/blogs/5a422a851b54a676234d17f7')
        const { id, ...blogWithoutId } = res.body

        assert.deepStrictEqual(blogWithoutId, {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})