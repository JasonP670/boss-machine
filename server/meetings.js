const express = require('express');
const { getAllFromDatabase, addToDatabase, createMeeting, deleteAllFromDatabase } = require('./db');
const meetingsRouter = express.Router();

// Get all meetings
meetingsRouter.get('/', (req, res) => {
    const meetings = getAllFromDatabase('meetings');
    if (!meetings) {
        res.status(404).send("Couldn't find any meetings boss")
    }
    res.status(200).send(meetings)
})

// Post new meeting
meetingsRouter.post('/', (req, res) => {
    const newMeeting = createMeeting();
    res.status(200).send(newMeeting);
})

// Delete meetings
meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase();
    res.status(204).send();
})

module.exports = meetingsRouter;