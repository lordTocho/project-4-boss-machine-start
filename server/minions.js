// contains all of the API routes for the minions requests
const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const e = require('express');
const { createMeeting, 
        getAllFromDatabase, 
        getFromDatabaseById, 
        addToDatabase,
        updateInstanceInDatabase,
        deleteFromDatabasebyId,
        deleteAllFromDatabase
      } = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
        const minion = getFromDatabaseById('minions', id);
        if (minion) {
          req.minion = minion;
          next();
        } else {
          res.status(404).send();
        }
});

// retrieve all of the minions from the array
minionsRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
})

// adding minion to database
minionsRouter.post('', (req, res, next) => {

    // if the minion entry is good
    if( addToDatabase( 'minions', req.body ) !== null ) {
        res.send("New minion successfully added");
    }
    else {
        res.status(400).send("New minion was not successfully added.");
    }
});

// retrieving a minion based on ID
minionsRouter.get("/:minionId", (req, res, next) => {
    let minionId = req.params.id
    res.send(getFromDatabaseById( 'minions', minionId ))
});

// updating minion based on ID
minionsRouter.put("/:minionId", (req, res, next) => {
    res.send( updateInstanceInDatabase( 'minions', req.query ) );
});

// deleting minion record
minionsRouter.delete('/:minionId', (req, res, next) => {
    let minionId = req.params.minionId;
    if( deleteFromDatabasebyId( 'minions', minionId ) ) {
        res.send("Deletion successful");
    }
    else {
        res.status( 400 ).send( "deletion was not successfull" );
    }
});