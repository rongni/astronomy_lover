const express = require('express');
const mongoose = require("mongoose")
const supertest = require("supertest");
const Notes = require('../models/notes')
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

//Test get /api/notes/allnotes 

test("GET /api/notes/allnotes", async () => {

    await supertest(app).get("/api/notes/allnotes")
        .expect(200)
});


//Test get /api/notes/ by invalid image id 
test("GET /api/notes/:invalidid", async () => {

    await supertest(app).get("/api/notes/3334")
        .expect(404)
});

//Test get /api/notes/ by valid image id 
test("GET /api/notes/:validid", async () => {

    const testNote = {
        id: 102693,
        notes: [{
            "username": "lol",
            "note": "This is Lol"
        }, {
            "username": "lol2",
            "note": "This is Lol2"
        }]
    }

    await supertest(app).get("/api/notes/102693")
        .expect(200)
        .then((response) => {

            expect(response.body.id).toBe(testNote.id);
            expect(response.body.notes[0].username).toBe(testNote.notes[0].username);
            expect(response.body.notes[1].username).toBe(testNote.notes[1].username);
            expect(response.body.notes[0].note).toBe(testNote.notes[0].note);
            expect(response.body.notes[1].note).toBe(testNote.notes[1].note);
        });
});

// test post with empty post body
test("POST /api/notes/emptybody", async () => {
    await supertest(app)
        .post("/api/notes")
        .expect(400)
})

// test post with id but empty note 
test("POST /api/notes/emptynote", async () => {
    await supertest(app)
        .post("/api/notes")
        .send({ id: 222 })
        .expect(400)
})

// test post with valid post body 
test("POST /api/notes", async () => {
    const data = {
        "id": 102694,
        "notes": [{
            "username": "xxxx",
            "note": "This is xxx"
        }]
    }

    await supertest(app)
        .post("/api/notes")
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response

            expect(response.body.id).toBe(data.id);
            expect(response.body.notes[0].username).toBe(data.notes[0].username);
            expect(response.body.notes[0].note).toBe(data.notes[0].note);


            // Check the data in the database
            const oneNote = await Notes.findOne({ id: response.body.id })
            expect(oneNote).toBeDefined()
        })
})


// test put with add one note 

test("put /api/notes/:id/edit", async () => {
    const testId = 2222
    const data = [
        {
            _id: "60749d3f7f5ad6960442bac5",
            username: "toDelte",
            note: "This is a note to be deleted"
        }]


    await supertest(app)
        .put("/api/notes/" + testId + "/edit")
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.id).toBe(testId);
            expect(response.body.notes[0]._id).toBe(data[0]._id);
            expect(response.body.notes[0].username).toBe(data[0].username);

            // Check the data in the database
            const oneNote = await Notes.findOne({ id: testId, 'notes._id': data[0]._id })
            expect(oneNote).toBeDefined()
        })
})


//test delete with valid id and noteid 
test("DELETE /api/notes/:id/edit/:noteid", async () => {
    const data = {
        id: 2222,
        notes: [{
            _id: "60749d3f7f5ad6960442bac5",
            username: "toDelte",
            note: "This is a note to be deleted"
        }]
    }

    await supertest(app)
        .delete("/api/notes/" + data.id + "/edit/" + data.notes[0]._id)
        .expect(200)
        .then(async () => {
            expect(await Notes.findOne({ id: data.id, 'notes._id': data.notes[0]._id })).toBeFalsy()
        })
})

//test delete with invalid noteid 
test("DELETE /api/notes/:id/edit/:invalidnoteid", async () => {
    await supertest(app)
        .delete("/api/notes/" + 2222 + "/edit/" + 211515)
        .expect(404)
})



// test put with modified on note 
test("put  /api/notes/:id/edit/:noteid", async () => {
    const testNote = "2222/edit/60749d3f7f5ad6960442bac4"
    const data =
    {
        note: "This is Lol2 modified"
    }


    await supertest(app)
        .put("/api/notes/" + testNote)
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.notes[0].note).toBe(data.note);

            // Check the data in the database
            const oneNote = await Notes.findOne({ id: 2222, 'notes.note': data.note })
            expect(oneNote).toBeDefined()
        })
})








