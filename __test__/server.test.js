'use strict'

const {server}=require('../src/server')
const supertest=require('supertest') 
const mockRequest = supertest(server)

describe('Web server',()=>{
    test('/hello works',async()=>{
        const response=await mockRequest.get('/hello')
        expect(response.status).toBe(200)
    })

    test('respond with 404 status',async()=>{
        const response=await mockRequest.get('/notfound')
        expect(response.status).toBe(404)
    })

    test('respond with 500 status',async()=>{
        const response=await mockRequest.get('/error')
        expect(response.status).toBe(500)
    })
})