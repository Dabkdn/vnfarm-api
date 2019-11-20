const jwt = require('jsonwebtoken');
const config = require('@config')

const testJwt = (req, res, next) => {
    let token = jwt.sign({
        data: 'foobar'
    }, 'secret', { expiresIn: '1h' });
    console.log(token)
    jwt.verify(token, 'secret', (err, decoded) => {
        if (!err) {
            console.log(decoded)
        }
        else {
            console.log('something wrong')
        }
    })
    let token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNTYyMDU0Mzc2LCJleHAiOjE1NjIwNTc5NzZ9.aVejc-Vaa36N9AS83WtHYIa9zK5veKSRK52OibJF_sk'
    jwt.verify(token2, 'secret', (err, decoded) => {
        if (!err) {
            console.log(decoded)
        }
        else {
            console.log('something wrong 2')
        }
    })
    return next()
}

const requireLogin = (req, res, next) => {

    if (req.session.token) {
        return next()
    }
    else {
        return res.status(401).send({
            message: 'Unauthorized!'
        });
    }
}

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    // if (token.startsWith('Bearer ')) {
    //     // Remove Bearer from string
    //     token = token.slice(7, token.length);
    // }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

const checkPermission = (req, res, next) => {
    let decoded = req.decoded
    //check userId 
    if (decoded && decoded.userId != "5d1b03759f18d43d77423970") {
        return res.status(401).send({
            success: false,
            message: 'not permission'
        })
    }
    else {
        next()
    }
}


module.exports = {
    testJwt,
    requireLogin,
    checkToken,
    checkPermission
}
