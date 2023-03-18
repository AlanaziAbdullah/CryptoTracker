export class Asset {
  constructor(id, amount) {
    (this.id = id), (this.amount = amount);
  }

  buyWithAmount(amount) {
    this.amount += amount;
  }

  getId() {
    return this.id;
  }

  sellWithAmount(amount) {
    this.amount -= amount;
  }
}
