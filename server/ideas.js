// create the router for the ideas portion of the API
const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

module.exports = ideasRouter;

const { createMeeting, 
    getAllFromDatabase, 
    getFromDatabaseById, 
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
  } = require('./db');

  ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.status(404).send();
    }
});

ideasRouter.get('/', (req, res, next ) => {
    res.send( getAllFromDatabase( 'ideas' )) ;
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next ) => {
    if( addToDatabase( 'ideas', req.body ) !== null ) {
        res.status(200).send( "Added idea successfully" );
    }
    else {
        res.status(400).send( "Added idea failed." );
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    let ideaId = req.params.ideaId
    res.send( getFromDatabaseById( 'ideas', ideaId ) );
})

ideasRouter.put( '/:ideaId ', checkMillionDollarIdea, (req, res, next) => {
    if( updateInstanceInDatabase( 'ideas', req.query ) !== null ) {
        res.status(200).send("Idea update successful");
    }
    else {
        res.status(400).send("Idea update failed");
    }
});

ideasRouter.delete( ':ideaId', (req, res, next) => {
    let ideaId = req.params.ideaId;
    if( deleteFromDatabasebyId( 'ideas', ideaId ) ) {
        res.status(200).send( 'Idea deletion successful' )
    }
    else {
        res.status(400).send( 'Idea deletion failed' )
    }
} )