const { imageService } = require('@services')

const addImage = async (req, res) => {
    try {
        await imageService.add(req.file).then((result) => {
            res.json(result)
        })
    }
    catch (err) {
        res.status(400).send({
            message: 'failed to register. ' + err
        })
    }
}
const getImages = (req, res) => {
    try {
        imageService.getAll().then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
const updateImage = (req, res) => {
    try {
        imageService.update(req.body)
            .then(result => {
                res.json(result)
            })
    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
const deleteImage = (req, res) => {
    try {
        imageService.remove(req.body).then(result => {
            res.json(result)
        })
    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
const getImage = (req, res) => {
    try {
        if (req.query.id && req.query.id != null) {
            imageService.get(req.query.id).then(result => {
                res.json(result)
            })
        }
        else {
            throw "id is required"
        }

    }
    catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

module.exports = {
    addImage,
    getImages,
    getImage,
    updateImage,
    deleteImage
}