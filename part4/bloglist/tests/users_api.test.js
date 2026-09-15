const assert = require('node:assert')
const mongoose = require('mongoose')
const User = require('../models/user.js')
const { test, beforeEach, after, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app.js')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const etalonUser = new User({
        username: "Kaktus",
        name: "Dinu Ghimpu",
        passwordHash: "Gangbus13"
    })

    await etalonUser.save()
})

describe('Tests suite for users router', () => {
    describe('Successful attempts', () => {
        test('when there occurs a successful creating of a user, it should return status code 201', async () => {
            const res = await api.post('/api/users').send({
                username: "Vaneabat",
                name: "Chiriuhavitanta",
                password: "Gangbus"
            })

            const {id, ...userWithoutId} = res.body

            assert.deepStrictEqual(userWithoutId, {
                username: "Vaneabat",
                name: "Chiriuhavitanta"
            })

            assert.strictEqual(res.status, 201)
        })
    })

    describe('Failed request', () => {
        describe('when important fields are empty', () => {
            test('when username is missing, it should return status code 400', async () => {
                const res = await api.post('/api/users').send({
                    name: "Chiriuhavitanta",
                    password: "Gangbus"
                })

                assert.strictEqual(res.status, 400)
            })

            test('when password is missing, it should return status code 400', async () => {
                const res = await api.post('/api/users').send({
                    username: "Gangbus",
                    name: "Chiriuhavitanta",
                })

                assert.strictEqual(res.status, 400)
            })

            test('when both username and password are missing, it should return status code 400', async () => {
                const res = await api.post('/api/users').send({
                    name: "Chiriuhavitanta"
                })

                assert.strictEqual(res.status, 400)
            })

        })

        describe('when important fields are shorted than expected', () => {
            test('when username is too short, it should return status code 400', async () => {
                const res = await api.post('/api/users').send({
                    username: "Va",
                    name: "Chiriuhavitanta",
                    password: "Gangbus"
                })

                assert.strictEqual(res.status, 400)
            })

            test('when password is too short, it should return status code 400', async () => {
                const res = await api.post('/api/users').send({
                    username: "Vanea gang",
                    name: "Chiriuhavitanta",
                    password: "Ga"
                })

                assert.strictEqual(res.status, 400)
            })
        })

        describe('when username isnt unique', () => {
            test('when user attempts to create a user with a existing username, it should return status code 400', async () => {
                const res = await api.post('/api/users').send({
                    username: "Kaktus",
                    name: "Valera",
                    password: "Gangbuscuvanea"
                })

                const user = res.body

                assert.strictEqual(res.status, 400)
                assert.deepStrictEqual(user, { error: "Use another username!" })
            })
        })

        describe('mixed invalid|valid cases', () => {
            test('when a user has a valid username and an invalid password, it should return status code 400', async () => {
                const res = await api.post('/api/users').send({
                    username: "Kaadsffds",
                    name: "Valera",
                    password: "Ga"
                })

                assert.strictEqual(res.status, 400)
            })

            test('when a user has a invalid username and an valid password, it should return status code 400', async () => {
                const res = await api.post('/api/users').send({
                    username: "Ka",
                    name: "Valera",
                    password: "Gagangngsfdsn"
                })

                assert.strictEqual(res.status, 400)
            })
        })
    })
})

after( async () => {
    await mongoose.connection.close()
})