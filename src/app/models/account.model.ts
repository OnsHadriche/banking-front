import Client from "./client.model";

export default class Account {
  rib: number;
  balance: number;

  client: Client;
  constructor(
    rib: number,
    balance: number,
    client: Client
  ) {
    this.rib = rib;
    this.balance = balance;

    this.client= client;
  }
}
