export default class Card {

  constructor(colour, value,) {
    this._colour = colour;
    this._value = valor;
  }

  get colour() {
    return this._colour;
  }

  set colour(colour) {
    this._colour = colour;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}