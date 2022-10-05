const cookieParser = require('cookie-parser');
const { isAuthenticatedAsAdminOrRedirect}  = require('@twihika/auth');

// firebase adminほどおおきくなくてよいので
const express = require('express');
const app = express();
const port = 3000;
app.use(cookieParser());

app.use(async (req, res, next) => {
  const token = req.cookies['__session'];
  if (token) {
    try {
      const redirect = await isAuthenticatedAsAdminOrRedirect(req);
      if (redirect) {
        return res.redirect(302, 'https://id.twi-hika.com/login');
      }
      return next();
    } catch (e) {
      return res.redirect(302, 'https://id.twi-hika.com/login');
    }
  }
  return res.redirect(302, 'https://id.twi-hika.com/login');
});
app.use(express.static('storybook-static'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
