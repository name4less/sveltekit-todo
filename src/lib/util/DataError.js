export default class DataError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}