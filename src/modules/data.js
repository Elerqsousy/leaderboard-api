class Object {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

export default class Data {
  constructor() {
    this.list = [];
  }

  add(name, score) {
    const item = new Object(name, score);
    this.list = [...this.list, item];
  }
}
