var express = require('express'),
  app = express();
  const PORT = "3000";

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var routerForUsers = express.Router();
app.use('/users', routerForUsers);


var UsersController = require('./controllers/users');
var usercontrol = new UsersController(routerForUsers);

// testdata
var UsersService = require('./services/users');
var user1 = UsersService.addUser({firstName: 'b1', lastName: 'hungri', email: 'test1@gmail.com'});
var user2 = UsersService.addUser({firstName: 'b2', lastName: 'na', email: 'test2@gmail.com'});
var user3 = UsersService.addUser({firstName: 'b3', lastName: 'me', email: 'test3@gmail.com'});

    // start the server
    app.listen(PORT, () =>
    console.log(`Server Running on port: http://localhost:${PORT}`)
  );