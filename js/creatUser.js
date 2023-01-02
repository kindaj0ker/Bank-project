// Create new user account
const uniqid = new ShortUniqueId();

export class User {
  constructor(fName, lName, bDay, email, password) {
    this.id = uniqid();
    this.fName = fName;
    this.lN = lName;
    this.bDay = bDay;
    this.email = email;
    this.password = password;
    this.cards = [];
    this.transactions = [];
    this.location = [];
  }

  createNewCard(cardPlan, id = `${uniqid()}`, expired, currency = "$") {
    const day = new Date().getDate().toString().padStart(2, "0");
    const month = new Date().getMonth().toString().padStart(2, "0");
    const year = new Date().getFullYear() + 4;
    const expiredDate = day + "-" + month + "-" + year;
    const data = new Map([
      ["plan", `${cardPlan}`],
      ["id", `${id}`],
      ["expired", `${expiredDate}`],
      ["currency", `${currency}`],
    ]);
    const card = Object.fromEntries(data);
    this.cards.push(card);
  }

  createNewTransaction(
    group,
    cardID,
    transactionID = `${uniqid()}`,
    amount,
    currency,
    date = `${new Date().toISOString().split("T")[0]}`,
    type,
    savingType = "other"
  ) {
    const data = new Map([
      ["group", `${group}`],
      ["cardID", `${cardID}`],
      ["transactionID", `${transactionID}`],
      ["amount", `${amount}`],
      ["currency", `${currency}`],
      ["type", `${type}`],
      ["date", `${date}`],
      ["savingType", `${savingType}`],
    ]);
    const transaction = Object.fromEntries(data);
    this.transactions.push(transaction);
  }
}
