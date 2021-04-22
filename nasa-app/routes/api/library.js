const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');
const Library = require('../../models/library')
const { body, param, validationResult } = require('express-validator');


// @route    GET api/library/alllibrary
// @desc     Get all library
// @access   Public
router.get('/alllibrary', async (req, res) => {
    try {
        const collection = await Library.find()
        res.json(collection)


        if (!collection) {
            return res.status(400).json({ msg: 'There is no library for this user' });
        }

        // res.json(collection);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/library/:email
// @desc     Get current users library
// @access   Private

router.get('/:email', param('email').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const oneLibrary = await Library.findOne({ 'email': { '$regex': req.params.email } })
        if (oneLibrary == null) {
            return res.status(404).json({ message: 'Cant find user' })
        }
        return res.json(oneLibrary);
        // getUser()
        // return res.json(res.user);

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

});


// @route    Post api/library/
// @desc     Post one library
// @access   Public 

router.post('/', body('email').isEmail(),

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const libraryFields = {
            email: req.body.email,
            image: req.body.image
        }
        try {
            // Using upsert option (creates new doc if no match is found):
            const oneLibrary = await Library.findOneAndUpdate(
                { email: req.body.email },
                { $set: libraryFields },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
            return res.json(oneLibrary);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }


    })

// @route    put api/library/:email
// @desc     Update one library
// @access   Public 


router.put('/:email', getUser, body().notEmpty(), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        req.body.image.forEach(function (item) {
            res.user.image.unshift(item)
        })
        const updatedUser = await res.user.save()

        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }


})

// @route    DELETE api/library/:email/images/:image_id
// @desc     Delete one image from library base on image_id
// @access   Public

router.delete('/:email/images/:image_id', getUser, async (req, res) => {
    try {

        res.user.image = res.user.image.filter(
            (img) => img.id.toString() !== req.params.image_id
        );

        await res.user.save();

        return res.status(200).json(res.user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

// @route    DELETE api/library/:email/images/:image_id
// @desc     Delete one image from library base on image_id
// @access   Public

router.delete('/:email/images', getUser, async (req, res) => {
    try {
        req.body.image.forEach(function (item) {
            res.user.image = res.user.image.filter(
                (img) => img.id.toString() !== item.image_id.toString()
            );

        })


        await res.user.save();

        return res.status(200).json(res.user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});











//a helper function to getuser since almost all of our request need user info

async function getUser(req, res, next) {
    try {


        const user = await Library.findOne({ 'email': { '$regex': req.params.email } })
        if (user == null) {
            return res.status(404).json({ message: 'Cant find user' })
        }
        res.user = user
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }


}


module.exports = router;