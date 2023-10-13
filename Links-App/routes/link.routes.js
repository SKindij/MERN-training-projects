// link.routes.js
const {Router} = require('express');
const config = require('config');
// library for generating unique codes
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
// creating Express Router instance
const router = Router()

// Route to generate short link
router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body
    // generate unique short code
    const code = shortid.generate()

    const existing = await Link.findOne({ from })

    if (existing) {
      // if link with same 'from' already exists, return existing link
      return res.json({ link: existing })
    }
     // create full 'to' URL
    const to = baseUrl + '/t/' + code

    const link = new Link({
      code, to, from, owner: req.user.userId
    })
     // save newly created link
    await link.save()
    res.status(201).json({ link })
  } catch (e) {
    // respond with Internal Server Error status
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

// Route to retrieve user's links
router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    // respond with user's links
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

// Route to retrieve specific link by ID
router.get('/:id', auth, async (req, res) => {
  try {
    // find link by its ID
    const link = await Link.findById(req.params.id)
    // respond with retrieved link
    res.json(link)
  } catch (e) {
    // respond with Internal Server Error status
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

module.exports = router
