export default class Account {
  rib: number;
  balance: number;

  clientId: number;
  constructor(
    rib: number,
    balance: number,
    creationDate: Date,
    clientId: number
  ) {
    this.rib = rib;
    this.balance = balance;

    this.clientId = clientId;
  }
}
