const request = require('supertest');
const app = require('../../../app');

describe('Test the public content', () => {
    test('It should response the GET method', async () => {
        const res = await request(app).get("/api/test/all");
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual("Public Content.");
    });
});