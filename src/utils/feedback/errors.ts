interface IApplicationError {
    message: string;
    status: number;
}

export class ApplicationError extends Error {
    status: number;
    constructor(error: IApplicationError) {
        super(error.message);
        this.status = error.status;
    }
}

export class ValidationError extends ApplicationError {
    constructor(message = 'Validation error') {
        super({ message, status: 422 });
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message = 'Not found error') {
        super({ message, status: 404 });
    }
}

export class UnauthorizedError extends ApplicationError {
    constructor(message = 'Unauthorized error') {
        super({ message, status: 401 });
    }
}

export class ForbiddenError extends ApplicationError {
    constructor(message = 'Forbidden error') {
        super({ message, status: 403 });
    }
}

export class InternalServerError extends ApplicationError {
    constructor(message = 'Internal server error') {
        super({ message, status: 500 });
    }
}

export class ConflictError extends ApplicationError {
    constructor(message = 'Conflict error') {
        super({ message, status: 409 });
    }
}

export class BadRequestError extends ApplicationError {
    constructor(message = 'Bad request error') {
        super({ message, status: 400 });
    }
}