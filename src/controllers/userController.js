const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 2592000,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: "E-mail existente" });
        }
        const user = await User.create(req.body);
        user.password = undefined;
        
        return res.send({ 
            user,
            token: generateToken({id: user.id}),
         });

    } catch (err) {
        return res.status(400).send({ error: 'Falha no cadastro' });
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    //console.log(user);
    if (!user) {
        return res.status(400).send({ error: 'Usuário não cadastrado' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Senha invalida' });
    }

    user.password = undefined;
    const token = 
    res.send({ 
        user, 
        token: generateToken({id: user.id}) 
    });

})

module.exports = app => app.use('/auth', router);