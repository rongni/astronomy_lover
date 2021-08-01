const app = require("./server");
const supertest = require("supertest");
const mongoose = require("mongoose");
const config = require('config');
const db = config.get('mongoURI');

beforeAll(async (done) => {
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
    done();
});

// auth token of current user
let auth_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3YTQ3NGJmMDU0NDdhMTU2NDQxMDc2In0sImlhdCI6MT" +
    "YxODYyNjM4MCwiZXhwIjoxNjE5MDU4MzgwfQ.gsG1g4dtn-Q-4XhPcLCZUED3jpnfG7_ZhrirStY2Ux8";
const test_data = { name: "test", email: "test@gmail.com", password: "123456" };

// create new user
// test("POST /api/user", async () => {
//     await supertest(app)
//         .post("/api/user")
//         .type('json')
//         .send(test_data)
//         .expect(200)
//         .then(async (res) => {
//             auth_token = await res.body['token'];
//             console.log(auth_token)
//         })
// });

// new user auth
test("GET /api/auth", async () => {
    await supertest(app)
        .get("/api/auth")
        .set('auth-token', auth_token)
        .expect(200)
        .then(async (res) => {
            expect(res.body.email).toBe(test_data.email)
        })
});

// user auth, not exist
test("GET /api/auth", async () => {
    await supertest(app)
        .get("/api/auth")
        .set('auth-token', "")
        .expect(401)
});

// authenticate user & get token
test("POST /api/auth", async () => {
    await supertest(app)
        .post("/api/auth")
        .type('json')
        .send({ email: "test@gmail.com", password: "123456" })
        .expect(200)
});

// authenticate user & get token, user doesn't exist
test("POST /api/auth", async () => {
    await supertest(app)
        .post("/api/auth")
        .type('json')
        .send({ email: "test@illinois.edu", password: "123456" })
        .expect(400)
});

// authenticate user & get token, password not match
test("POST /api/auth", async () => {
    await supertest(app)
        .post("/api/auth")
        .type('json')
        .send({ email: "test@gmail.com", password: "1234567" })
        .expect(400)
});

// User already existed
test("POST /api/user", async () => {
    await supertest(app)
        .post("/api/user")
        .type('json')
        .send({ name: "test", email: "test@gmail.com", password: "123456" })
        .expect(400)
});

// User created, no password provided
test("POST /api/user", async () => {
    await supertest(app)
        .post("/api/user")
        .type('json')
        .send({ name: "test", email: "test@gmail.com" })
        .expect(400)
});

// User created, no password length < 6
test("POST /api/user", async () => {
    await supertest(app)
        .post("/api/user")
        .type('json')
        .send({ name: "test", email: "test@gmail.com", password: "123456" })
        .expect(400)
});

// User created, no email provided
test("POST /api/user", async () => {
    await supertest(app)
        .post("/api/user")
        .type('json')
        .send({ name: "test", password: "123456" })
        .expect(400)
});

// User created, no name provided
test("POST /api/user", async () => {
    await supertest(app)
        .post("/api/user")
        .type('json')
        .send({ email: "test@gmail.com", password: "123456" })
        .expect(400)
});

// get current user infomation
test("GET /api/user/me", async () => {
    await supertest(app)
        .get("/api/user/me")
        .set('auth-token', auth_token)
        .expect(200)
});

// get current user infomation, doesn't exist
test("GET /api/user/me", async () => {
    await supertest(app)
        .get("/api/user/me")
        .set('auth-token', "")
        .expect(401)
});

// update password
test("PUT /api/user", async () => {
    await supertest(app)
        .put("/api/user/me/password")
        .set('auth-token', auth_token)
        .type('json')
        .send({ password: "1234567" })
        .expect(200)
});

// authenticate user & get token after password update
test("POST /api/auth", async () => {
    await supertest(app)
        .post("/api/auth")
        .type('json')
        .send({ email: "test@gmail.com", password: "1234567" })
        .expect(200)
});

// update password
test("PUT /api/user", async () => {
    await supertest(app)
        .put("/api/user/me/password")
        .set('auth-token', auth_token)
        .type('json')
        .send({ password: "" })
        .expect(400)
});

// update avatar
test("PUT /api/user/avatar", async () => {
    await supertest(app)
        .put("/api/user/me/avatar")
        .set('auth-token', auth_token)
        .type('json')
        .send({ avatar: "https://avatars.github-dev.cs.illinois.edu/u/4682?s=460" })
        .expect(200)
});

// update avatar
test("PUT /api/user/avatar", async () => {
    await supertest(app)
        .put("/api/user/me/avatar")
        .set('auth-token', auth_token)
        .type('json')
        .send({ avatar: "" })
        .expect(400)
});

// // delete current user
// test("DELETE /api/user/me", async () => {
//     await supertest(app)
//         .delete("/api/user/me")
//         .set('auth-token', auth_token)
//         .expect(200)
// });

// delete current user, doesn't exist 
test("DELETE /api/user/me", async () => {
    await supertest(app)
        .delete("/api/user/me")
        .set('auth-token', "")
        .expect(401)
});

afterAll(async (done) => {
    await mongoose.connection.close();
    done();
});
