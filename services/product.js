const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const add = (data) => {
    console.log(data);

    return Product.insertMany(data)
}
const getAll = (pageSize, pageIndex, sort = '', search = '') => {
    let sortArg = {}
    switch (sort) {
        case "nameup":
            sortArg = { name: 1 }
            break;
        case "namedown":
            sortArg = { name: -1 };
            break;
        case "newest":
            sortArg = { createdDate: -1 };
            break;
        case "latest":
            sortArg = { createdDate: 1 };
            break;
        default:
            sortArg = {}
    }
    const limit = parseInt(pageSize)
    const skip = parseInt(pageIndex) * parseInt(pageSize)
    return new Promise((resolve, reject) => {
        Product.countDocuments({ "name": { $regex: search, $options: 'i' } }, (err, count) => {
            if (err) {
                reject(err)
            }
            Product.find({ "name": { $regex: search, $options: 'i' } })
                .collation({ locale: "en" })
                .sort(sortArg)
                .populate('auction')
                .populate('unit')
                .limit(limit)
                .skip(skip)
                .then(data => {
                    const result = {
                        totalPage: Math.ceil(count / pageSize),
                        pageSize: pageSize,
                        pageIndex: pageIndex,
                        data: data
                    }
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })

        })
    })
}

const getProductsByCategoryId = (categoryId, pageSize, pageIndex, sort = '', search = '') => {
    let sortArg = {}
    switch (sort) {
        case "nameup":
            sortArg = { name: 1 }
            break;
        case "namedown":
            sortArg = { name: -1 };
            break;
        case "newest":
            sortArg = { createdDate: -1 };
            break;
        case "latest":
            sortArg = { createdDate: 1 };
            break;
        default:
            sortArg = {}
    }
    const limit = parseInt(pageSize)
    const skip = parseInt(pageIndex) * parseInt(pageSize)
    return new Promise((resolve, reject) => {
        Product.countDocuments({
            categoryId: categoryId,
            "name": { $regex: search, $options: 'i' }
        }, (err, count) => {
            if (err) {
                reject(err)
            }
            Product.find({
                categoryId: categoryId,
                "name": { $regex: search, $options: 'i' }
            })
                .collation({ locale: "en" })
                .sort(sortArg)
                .populate('auction')
                .populate('unit')
                .limit(limit)
                .skip(skip)
                .then(data => {
                    const result = {
                        totalPage: Math.ceil(count / pageSize),
                        pageSize: pageSize,
                        pageIndex: pageIndex,
                        data: data
                    }
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })

        })
    })
}

const getMyProducts = (userId, pageSize, pageIndex, sort = '', search = '') => {
    let sortArg = {}
    switch (sort) {
        case "nameup":
            sortArg = { name: 1 }
            break;
        case "namedown":
            sortArg = { name: -1 };
            break;
        case "newest":
            sortArg = { createdDate: -1 };
            break;
        case "latest":
            sortArg = { createdDate: 1 };
            break;
        default:
            sortArg = {}
    }
    const limit = parseInt(pageSize)
    const skip = parseInt(pageIndex) * parseInt(pageSize)
    return new Promise((resolve, reject) => {
        Product.countDocuments({
            userId: userId,
            "name": { $regex: search, $options: 'i' }
        }, (err, count) => {
            if (err) {
                reject(err)
            }
            Product.find({
                userId: userId,
                "name": { $regex: search, $options: 'i' }
            })
                .collation({ locale: "en" })
                .sort(sortArg)
                .populate('auction')
                .populate('unit')
                .limit(limit)
                .skip(skip)
                .then(data => {
                    const result = {
                        totalPage: Math.ceil(count / pageSize),
                        pageSize: pageSize,
                        pageIndex: pageIndex,
                        data: data
                    }
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })

        })
    })
}
const update = (data) => {
    return Product.update({ _id: data.id }, data)
}
const remove = (data) => {
    return Product.remove({ _id: { $in: data } })
}
const get = (id, populate = '') => {
    return Product.findOne({ _id: id }).populate('auction').populate('user').populate('unit')
}

module.exports = {
    add,
    getAll,
    update,
    remove,
    getProductsByCategoryId,
    getMyProducts,
    get
}