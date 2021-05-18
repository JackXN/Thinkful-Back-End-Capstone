const service = require('./movies.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

//! Validation

const movieExists = async (req,res,next) => {
    const {movieId} = req.params;
    const movie = await service.read(movieId);
    if(movie) {
        res.locals.movie = movie;
        return next()
    }

next({
    status: 404,
    message: 'Movie cannot be found',
})
}


const readMovieReviews = (req,res,next) => {
    const {movieId} = req.params;
    const data = await service.readMovieReviews(moveId)
res}

const readMovieTheaters = async (req,res,next) => {
    const {movieId} = req.params;
    const data = await service.readMovieTheaters(movieId)
    res.json({data})
}


const read = (req,res,next) => {
    const {movie:data} = res.locals;
    res.json({data})
}

const list = async(req,res,next) => {
    const{is_showing} = req.query
    if(is_showing) {
        const data = await service.listCurrentlyShowing();
        res.json({data: data})
    }else {
        const data = await service.list();
        res.json({data: data})
    }
}


module.exports = {
    readMovieReviews: [
      asyncErrorBoundary(movieExists),
      asyncErrorBoundary(readMovieReviews),
    ],
    readMovieTheaters: [
      asyncErrorBoundary(movieExists),
      asyncErrorBoundary(readMovieTheaters),
    ],
    read: [asyncErrorBoundary(movieExists), read],
    list: asyncErrorBoundary(list),
  };
  
  