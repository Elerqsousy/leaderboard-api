import Object from './object.js'

export default class Data {
  constructor() {
    this.list = [];
  }

  add(name, score) {
    const item = new Object(name, score);
    this.list = [...this.list, item];
  }
}
