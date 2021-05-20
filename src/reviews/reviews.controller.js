const service = require('./reviews.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');





// Validation

const reviewExists = async (req,res,next) => {
    const {reviewId} = req.params
const review = await service.read(reviewId)
console.log("review exists test", review.length);
if(review.length && review.length > 0) {
    res.locals.review = review[0]
    return next();
}

next({
    status:404,
    message: 'Review cannot be found'
})
}




// CRUD
const read = async (req,res,next) => {
    res.json({data: res.locals.review})
}

const update = async (req,res,next) => {
    const {content,score} = req.body.data;
    res.locals.review.content = content;
    res.locals.review.score = score;
    

    const review = await service.update(res.locals.review)
    const data = await service.readReviewWithCritic(req.params.reviewId);
res.json({ data: data[0]})
}


const destroy = async (req,res,next) => {
const {reviewId} = req.params;
await service.delete(reviewId)

res.sendStatus(204);

}



module.exports = {
    read: [asyncErrorBoundary(reviewExists), read],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  };
  
  