const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('6071a45462ec98a3d61e010c')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);   


mongoose.connect('mongodb+srv://dhiraj:Dhiraj@cluster0.mnlmn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(result => {
  app.listen(5000);
}).catch(err => {  
  console.log(err);
});
// mongoConnect(() => {
//   app.listen(5000);
// });
