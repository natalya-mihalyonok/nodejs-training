import express from 'express';
import * as storage from './storage';
import { validateSchema, VALIDATION_NAMES } from './utils/validation_utils';
import { userSchema, createUserSchema, searchUserSchema } from './schemes';
import { prepareErrorMessage } from './utils/errors_utils';

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server starts at http://localhost:${port}`);
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const { data, error } = storage.getUser(id);
    if (!error) {
        res.json(data);
    } else {
        res.status(404).json(prepareErrorMessage(error));
    }
});

app.post('/user', validateSchema(createUserSchema, VALIDATION_NAMES.BODY), (req, res) => {
    const { data } = storage.createUser(req.body);
    res.json(data);
});

app.get('/users', validateSchema(searchUserSchema, VALIDATION_NAMES.QUERY), (req, res) => {
    const { limit, loginSubString } = req.query;
    const { data } = storage.getAutoSuggestUsers(loginSubString, limit);

    res.json(data);
});

app.put('/user', validateSchema(userSchema, VALIDATION_NAMES.BODY), (req, res) => {
    const { data, error } = storage.updateUser(req.body);
    if (!error) {
        res.json(data);
    } else {
        res.status(404).json(prepareErrorMessage(error));
    }
});

app.delete('/user/:id', (req, res) => {
    const { data, error } = storage.deleteUser(req.params.id);
    if (!error) {
        res.json(data);
    } else {
        res.status(404).json(prepareErrorMessage(error));
    }
});
