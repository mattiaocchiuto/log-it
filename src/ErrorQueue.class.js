export default class ErrorQueue {
    constructor(queueLength, onError) {
        this.errorsQueue = [];
        this.queueLength = queueLength;
        this.onError = onError;
    }

    addError(error) {
        this.errorsQueue.push(error);

        if (this.errorsQueue.length === this.queueLength) {
            this.onError(this.errorsQueue);
            this.clearErrorsQueue();
        }
    }

    clearErrorsQueue() {
        this.errorsQueue = [];
    }
}
