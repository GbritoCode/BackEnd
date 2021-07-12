export default class SequelizeDelete {
  constructor(message, sequelizeObject) {
    this.message = message;
    this.sequelizeObject = sequelizeObject;
    this.name = 'Exception';
  }
}
