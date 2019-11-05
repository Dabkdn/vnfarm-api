const {roleService} = require('@services')

const getRoles = (req, res) => {
    try {
        roleService.getAll().then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.status(400).send({
            message: err
        })
    }
}
const getRole = (req, res) => {
    try {
        roleService.get(req.query.id).then(result => {
            res.json(result)
        })
    }
    catch(err) {
        res.status(400).send({
            message: err
        })
    }
}

module.exports = {
    getRoles,
    getRole
}