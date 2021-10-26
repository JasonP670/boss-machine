const express = require('express');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const ideasRouter = express.Router();



// Get all ideas
ideasRouter.get('/', (req, res) => {
    const ideas = getAllFromDatabase('ideas')
    if (!ideas) {
        res.status(404).send("duuuhh... We couldn't find any ideas boss.")
    }
    console.log("Here's all our ideas boss.")
    res.status(200).send(ideas);
})

// Create a new idea
ideasRouter.post('/', (req, res) => {
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    if (name && description && numWeeks && weeklyRevenue) {
        const newIdea = addToDatabase('ideas', req.body);
        console.log(newIdea);
        res.status(200).send(newIdea);
    }

})

// Get by id
ideasRouter.get('/:ideaId', (req, res) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if (!idea) {
        res.status(404).send("Uhh... What did you want me to do again?")
    }
    res.status(200).send(idea)
})

// Update idea
ideasRouter.put('/:ideaId', (req, res) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (!updatedIdea) {
        res.status(404).send("I don't remember what I was suppsed to change...")
    }
    res.status(200).send(updatedIdea);
})

// Delete idea
ideasRouter.delete('/:ideaId', (req, res) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (!deleted) {
        res.status(404).send("I couldn't hide that evidence, cuz I couldn't find it.")
    }
    res.status(404).send();
})



module.exports = ideasRouter;