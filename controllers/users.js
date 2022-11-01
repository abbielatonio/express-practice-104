var UsersService = require('../services/users');

class UsersController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/:id', this.getSingleUser.bind(this));
        this.router.post('/', this.postUser.bind(this));
        this.router.put('/:id', this.putUser.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));

    }

    getUsers(req, res) {
        var users = UsersService.getUsers();
        res.send(users);
    }

    getSingleUser(req, res) {
        var id = req.params.id;
        var user = UsersService.getSingleUser(id);

        if (!user) {
            res.status(404).json({error: "user doesnt exist"});
        } else {
            res.json(user);
        }
    }

    putUser(req, res) {
        var id = req.params.id;
        var user = UsersService.getSingleUser(id);

    
            if (!UsersService.updateUser(id, req.body)) {
                res.status(404).json({error: "user doesnt exist"});
            } else {
                res.status(201).json({message: "user updated"});
            }
        
    }

    postUser(req, res) {
        var userInfo = req.body;

        if (!UsersService.addUser(userInfo)) {
            res.sendStatus(500);
        } else {
            res.status(200).json({message: "user created"});
        }
    
        }
    

        deleteUser(req, res) {
            
            var id = req.params.id;
            var user = UsersService.deleteUser(id);
    
            if (!user) {
                res.status(404).json({error: "user doesnt exist"});
            } else {
                res.status(200).json({message: "user deleted"});
            }
        }
    }


module.exports = UsersController;