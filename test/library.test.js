const express = require('express');
const mongoose = require("mongoose")
const supertest = require("supertest");
const Library = require('../models/library')
jest.setTimeout(30000);

function createServer() {
    const app = express()
    app.use(express.json());
    app.use('/api/library', require('../routes/api/library'));
    app.use('/api/notes', require('../routes/api/notes'));
    app.get('/', (req, res) => res.send('Its working!'));
    return app
}
beforeEach((done) => {
    mongoose.connect(
        "mongodb+srv://rni4:110828@cluster0.lgoqf.mongodb.net/UnTest?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done()
    )
})

afterEach((done) => {
    mongoose.connection.close()
    done()
})




const app = createServer();


//Test get /api/library by email
test("GET /api/library", async () => {
    const libraryField =
    {
        email: "1397687928@gmail.com",
        image: [{
            "id": 424910,
            "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631280305225E03_DXXX.jpg"
        }]
    };

    await supertest(app).get("/api/library/1397687928@gmail.com")
        .expect(200)
        .then((response) => {

            expect(response.body.email).toBe(libraryField.email);
            expect(response.body.image.id).toBe(libraryField.image.id);
            expect(response.body.image.img_src).toBe(libraryField.image.img_src);
        });
});


//Test get /api/library by not register  email
test("GET /api/library/not register email", async () => {

    await supertest(app).get("/api/library/yhou316@gmail.com")
        .expect(404)
});

//Test get /api/library by invaild email
test("GET /api/library/invalid email", async () => {

    await supertest(app).get("/api/library/111gmail.com")
        .expect(400)
});


test("POST /api/library", async () => {
    const data = {
        email: "rong.ni110828@gmail.com",
        image: [{
            "id": 424920,
            "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631280305225E03_DXXX.jpg"
        }]
    }

    await supertest(app)
        .post("/api/library")
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response

            expect(response.body.email).toBe(data.email);
            expect(response.body.image[0].id).toBe(data.image[0].id);
            expect(response.body.image[0].img_src).toBe(data.image[0].img_src);

            // Check the data in the database
            const oneLibrary = await Library.findOne({ email: response.body.email })
            expect(oneLibrary).toBeDefined()
        })
})

test("POST /api/library/invalidemail", async () => {
    const data = {
        email: "rong.ni110828",
        image: [{
            "id": 424920,
            "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631280305225E03_DXXX.jpg"
        }]
    }

    await supertest(app)
        .post("/api/library")
        .send(data)
        .expect(400)
})



test("DELETE /api/library/:email/images/:image_id", async () => {
    // const post = await Post.create({
    // 	title: "Post 1",
    // 	content: "Lorem ipsum",
    // })
    const data = {
        email: "rong.ni110828@gmail.com",
        image: [{
            "id": 424920,
            "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631280305225E03_DXXX.jpg"
        }]
    }
    // const m = data.image.img_src.toString()
    // console.log(data.image[0].id)

    await supertest(app)
        .delete("/api/library/" + data.email + "/images/" + data.image[0].id)
        .expect(200)
        .then(async () => {
            expect(await Library.findOne({ email: data.email, 'image.id': data.image[0].id })).toBeFalsy()
        })
})

//test with not registed email
test("DELETE /api/library/:unknownemail/images/:image_id", async () => {
    // const post = await Post.create({
    // 	title: "Post 1",
    // 	content: "Lorem ipsum",
    // })
    const data = {
        email: "yhou316@gmail.com",
        image: [{
            "id": 424920,
            "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631280305225E03_DXXX.jpg"
        }]
    }

    await supertest(app)
        .delete("/api/library/" + data.email + "/images/" + data.image[0].id)
        .expect(404)
})

test("put /api/library/:email", async () => {
    const testEmail = "rong.ni110828@gmail.com"
    const data = [
        {
            "id": 424910,
            "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631280305225E03_DXXX.jpg"
        }
    ]

    await supertest(app)
        .put("/api/library/" + testEmail)
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.email).toBe(testEmail);
            expect(response.body.image[0].id).toBe(data[0].id);
            expect(response.body.image[0].img_src).toBe(data[0].img_src);

            // Check the data in the database
            const oneLibrary = await Library.findOne({ email: response.body.email })
            expect(oneLibrary).toBeDefined()
        })
})

//testPut with empty body

test("put /api/library/:correctemail", async () => {
    const testEmail = "rong.ni110828@gmail.com"
    const data = [
    ]

    await supertest(app)
        .put("/api/library/" + testEmail)
        .send(data)
        .expect(400)
})

//testPut with invalid email

test("put /api/library/:invalidemail", async () => {
    const testEmail = "yhou316@gmail.com"
    const data = [
    ]

    await supertest(app)
        .put("/api/library/" + testEmail)
        .send(data)
        .expect(404)
})






