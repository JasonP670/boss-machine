const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db')

// Get all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
})

// Create a new minion
minionsRouter.post('/', (req, res, next) => {
    let newMinion;
    req.body.salary = Number(req.body.salary);
    if (req.body.name && req.body.title && req.body.salary) {
        newMinion = addToDatabase('minions', req.body)
        console.log(`A new minion was just hired! His badge numebr is ${newMinion.id}`)
        res.status(200).send(newMinion)
    } else {
        res.status(400).send("Looks like not all required information was given");
    }
})


// Get a minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (!minion) {
        res.status(404).send("Theres not a minion with that works here under that badge number.")
    }
    console.log(`Someone is looking at your minion! His badge number is ${minion.id}.`)
    res.status(200).send(minion)
})


// Update a minion
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body)
    if (!updatedMinion) {
        res.status(500).send("Please update with valid data")
    }
    console.log(`Minion with badge number ${updatedMinion.id} had his employee file changed.`)
    res.status(200).send(updatedMinion)
})

// Delete a minion
minionsRouter.delete('/:minionId', (req, res, next) => {
    const checkDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (!checkDeleted) {
        res.status(500).send("Theres not a minion with that works here under that badge number.")
    }
    console.log("A minion was just fired!")
    res.status(404).send('Minion removed');
})

module.exports = minionsRouter;