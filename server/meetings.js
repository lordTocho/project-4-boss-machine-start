// handles all of the API calls for meetings
const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const { createMeeting, 
    getAllFromDatabase, 
    getFromDatabaseById, 
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
  } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    res.send( getAllFromDatabase( 'meetings' ) )
});

meetingsRouter.post('/', (req, res, next) => {
    if( addToDatabase( 'meetings', req.body ) !== null ) {
        res.status(200).send("Meeting successfully added")
    }
    else {
        res.status( 400 ).send("Meeting was not successfully added")
    }
});

meetingsRouter.delete("/", (req, res, sent) => {
    res.send( deleteAllFromDatabase('meetings') );
});