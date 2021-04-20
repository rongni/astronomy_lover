
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const User = require('../../models/User');

// @route    POST api/user
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'Required name').notEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password should longer than 6').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route    GET api/user
// @desc     Get user profile by user ID
// @access   Public
router.get('/me', auth,
    async (req, res) => {
      try {
        const profile = await User.findOne({
          _id: req.user.id
        }).populate('user', ['name', 'avatar', 'password']);
  
        if (!profile) return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
  
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);
  

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/me', auth, async (req, res) => {
    try {
      // Remove user
      await Promise.all([
        User.findOneAndRemove({ _id: req.user.id })
      ]);
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route    PUT api/password
// @desc     Update user password
// @access   Private
router.put('/me/password', [auth,
    check('password', 'Password is required').notEmpty()],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findOne({ _id: req.user.id });
        const salt = await bcrypt.genSalt(10);
        const { password } = req.body;
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);

// @route    PUT api/user/avatar
// @desc     Update user password
// @access   Private
router.put('/me/avatar', [auth,
    check('avatar', 'Avatar is required').notEmpty()],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findOne({ _id: req.user.id });
  
        const { avatar } = req.body;
        user.avatar = avatar;
  
        await user.save();
  
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);

module.exports = router;