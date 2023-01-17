// Create new user account
const uniqid = new ShortUniqueId();

export class User {
  constructor(
    fName,
    lName,
    bDay,
    email,
    password,
    cards = [],
    transactions = [],
    location = ""
  ) {
    this.id = uniqid();
    this.fName = fName;
    this.lName = lName;
    this.bDay = bDay;
    this.email = email;
    this.password = password;
    this.cards = cards;
    this.transactions = transactions;
    this.location = location;
  }

  createNewCard(cardPlan, id = `${uniqid()}`, expired = null, currency) {
    const day = new Date().getDate().toString().padStart(2, "0");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear() + 4;
    const expiredDate = expired ?? day + "-" + month + "-" + year;
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
    transactionID,
    amount,
    currency,
    type,
    date,
    savingType = "other"
  ) {
    const day = new Date().getDate().toString().padStart(2, "0");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear() + 4;
    const data = new Map([
      ["group", `${group}`],
      ["cardID", `${cardID}`],
      ["transactionID", transactionID ?? `${uniqid()}`],
      ["amount", `${amount}`],
      ["currency", `${currency}`],
      ["type", `${type}`],
      ["savingType", `${savingType}`],
      ["date", date ?? `${day + "-" + month + "-" + year}`],
    ]);
    const transaction = Object.fromEntries(data);
    this.transactions.push(transaction);
  }
}
