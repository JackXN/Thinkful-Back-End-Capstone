import { response } from "express";

const errorHandler = (error, req,res,next) => {
    console.error(error)
    const {status = 500, message = 'Something went wrong'} = error;
    response.status(status).json({error:message})
}

module.exports = errorHandler