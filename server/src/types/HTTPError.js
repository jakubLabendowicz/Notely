class HTTPError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class BadRequestError extends HTTPError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}

class UnauthorizedError extends HTTPError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

class ForbiddenError extends HTTPError {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}

class NotFoundError extends HTTPError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}

class ConflictError extends HTTPError {
    constructor(message = 'Conflict') {
        super(message, 409);
    }
}

class InternalServerError extends HTTPError {
    constructor(message = 'Internal Server Error') {
        super(message, 500);
    }
}

module.exports = {
    HTTPError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InternalServerError
}