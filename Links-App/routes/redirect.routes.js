// redirect.routes.js
const {Router} = require('express');
const Link = require('../models/Link');
// creating Express Router instance
const router = Router();

// Route for redirecting to original URL based on provided short code
router.get('/:code', async (req, res) => {
  try {
    // find link by provided short code
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++
      await link.save()
      // Redirect user to original URL
      return res.redirect(link.from)
    }

    res.status(404).json('Link not found')

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})


module.exports = router;
