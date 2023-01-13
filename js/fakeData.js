"use strict";

import { User } from "./creatUser.js";
const uniqid = new ShortUniqueId();
//Fake Peter class
export const userPeter = new User(
  "Peter",
  "Jackson",
  "2000-02-02",
  "peterJ@gmail.com",
  "IamPeter00!"
);

userPeter.createNewCard("VIP", "1", "20-08-2024", "$");
userPeter.createNewCard("PLUS", "2", "10-02-2026", "$");

userPeter.createNewTransaction(
  "other",
  "1",
  uniqid(),
  "130",
  "$",
  "deposit",
  "23-02-2021"
);
userPeter.createNewTransaction(
  "clothes",
  "1",
  uniqid(),
  "150",
  "$",
  "withdrawal",
  "03-02-2021"
);
userPeter.createNewTransaction(
  "recieve",
  "1",
  uniqid(),
  "1000",
  "$",
  "deposit",
  "13-03-2021"
);
userPeter.createNewTransaction(
  "grocery",
  "1",
  uniqid(),
  "540",
  "$",
  "withdrawal",
  "23-08-2020"
);
userPeter.createNewTransaction(
  "utilities",
  "1",
  uniqid(),
  "60",
  "$",
  "withdrawal",
  "13-12-2020"
);
userPeter.createNewTransaction(
  "grocery",
  "1",
  uniqid(),
  "98",
  "$",
  "withdrawal",
  "16-07-2020"
);
userPeter.createNewTransaction(
  "send",
  "1",
  uniqid(),
  "107",
  "$",
  "withdrawal",
  "20-11-2020"
);
userPeter.createNewTransaction(
  "send",
  "1",
  uniqid(),
  "15",
  "$",
  "withdrawal",
  "23-05-2021"
);
userPeter.createNewTransaction(
  "loan",
  "1",
  uniqid(),
  "800",
  "$",
  "deposit",
  "19-02-2020"
);
userPeter.createNewTransaction(
  "send",
  "1",
  uniqid(),
  "119",
  "$",
  "withdrawal",
  "14-05-2019"
);
userPeter.createNewTransaction(
  "recieve",
  "1",
  uniqid(),
  "2500",
  "$",
  "deposit",
  "16-10-2019"
);
userPeter.createNewTransaction(
  "utilities",
  "1",
  uniqid(),
  "50",
  "$",
  "withdrawal",
  "28-03-2020"
);
userPeter.createNewTransaction(
  "recieve",
  "2",
  uniqid(),
  "3000",
  "$",
  "deposit",
  "01-01-2021"
);
userPeter.createNewTransaction(
  "send",
  "2",
  uniqid(),
  "20",
  "$",
  "withdrawal",
  "16-11-2020"
);
userPeter.createNewTransaction(
  "other",
  "2",
  uniqid(),
  "25",
  "$",
  "withdrawal",
  "05-08-2020"
);
userPeter.createNewTransaction(
  "loan",
  "2",
  uniqid(),
  "500",
  "$",
  "deposit",
  "23-05-2020"
);
userPeter.createNewTransaction(
  "clothes",
  "2",
  uniqid(),
  "200",
  "$",
  "withdrawal",
  "28-07-2020"
);
userPeter.createNewTransaction(
  "other",
  "2",
  uniqid(),
  "60",
  "$",
  "withdrawal",
  "07-07-2019"
);
userPeter.createNewTransaction(
  "grocery",
  "2",
  uniqid(),
  "74",
  "$",
  "withdrawal",
  "01-02-2022"
);
userPeter.createNewTransaction(
  "grocery",
  "2",
  uniqid(),
  "113",
  "$",
  "withdrawal",
  "08-05-2020"
);
userPeter.createNewTransaction(
  "grocery",
  "2",
  uniqid(),
  "13",
  "$",
  "withdrawal",
  "25-05-2019"
);
userPeter.createNewTransaction(
  "send",
  "2",
  uniqid(),
  "19",
  "$",
  "withdrawal",
  "17-03-2020"
);
userPeter.createNewTransaction(
  "loan",
  "2",
  uniqid(),
  "1500",
  "$",
  "deposit",
  "08-09-2020"
);
userPeter.createNewTransaction(
  "send",
  "2",
  uniqid(),
  "129",
  "$",
  "withdrawal",
  "09-11-2020"
);
userPeter.createNewTransaction(
  "send",
  "24",
  uniqid(),
  "43",
  "$",
  "withdrawal",
  "10-06-2021"
);
userPeter.createNewTransaction(
  "grocery",
  "2",
  uniqid(),
  "65",
  "$",
  "withdrawal",
  "10-03-2019"
);
userPeter.createNewTransaction(
  "send",
  "2",
  uniqid(),
  "3",
  "$",
  "withdrawal",
  "10-06-2020"
);
userPeter.createNewTransaction(
  "clothes",
  "2",
  uniqid(),
  "234",
  "$",
  "withdrawal",
  "10-10-2020"
);
userPeter.createNewTransaction(
  "grocery",
  "2",
  uniqid(),
  "150",
  "$",
  "withdrawal",
  "16-07-2020"
);

userPeter.createNewTransaction(
  "savings",
  "2",
  uniqid(),
  "400",
  "$",
  "withdrawal",
  "11-05-2021",
  "other"
);
userPeter.createNewTransaction(
  "savings",
  "2",
  uniqid(),
  "50",
  "$",
  "withdrawal",
  "19-04-2020",
  "real-estate"
);
userPeter.createNewTransaction(
  "savings",
  "2",
  uniqid(),
  "200",
  "$",
  "withdrawal",
  "17-09-2021",
  "real-estate"
);
userPeter.createNewTransaction(
  "savings",
  "2",
  uniqid(),
  "70",
  "$",
  "withdrawal",
  "16-08-2022",
  "education"
);
userPeter.createNewTransaction(
  "savings",
  "1",
  uniqid(),
  "40",
  "$",
  "withdrawal",
  "03-05-2020",
  "travel"
);
userPeter.createNewTransaction(
  "savings",
  "1",
  uniqid(),
  "90",
  "$",
  "withdrawal",
  "15-05-2022",
  "travel",
  "education"
);
userPeter.createNewTransaction(
  "savings",
  "1",
  uniqid(),
  "500",
  "$",
  "withdrawal",
  "04-11-2019",
  "health"
);
userPeter.createNewTransaction(
  "savings",
  "1",
  uniqid(),
  "150",
  "$",
  "withdrawal",
  "12-04-2021",
  "travel"
);
userPeter.createNewTransaction(
  "savings",
  "1",
  uniqid(),
  "200",
  "$",
  "withdrawal",
  "12-02-2021",
  "travel"
);
userPeter.createNewTransaction(
  "savings",
  "2",
  uniqid(),
  "19",
  "$",
  "withdrawal",
  "10-03-2021",
  "health"
);
userPeter.createNewTransaction(
  "savings",
  "2",
  uniqid(),
  "20",
  "$",
  "withdrawal",
  "11-02-2020",
  "travel"
);
if (localStorage.getItem("peterJ@gmail.com") === null) {
  localStorage.setItem("peterJ@gmail.com", JSON.stringify(userPeter));
}

//Fake Anna class

export const userAnna = new User(
  "Anna",
  "Black",
  "1990-10-12",
  "AnnaB@gmail.com",
  "IamAnna90!"
);

userAnna.createNewCard("STANDART", "3", "10-05-2026", "$");
userAnna.createNewCard("PREMIUM", "4", "01-01-2027", "$");

userAnna.createNewTransaction(
  "clothes",
  "3",
  uniqid(),
  "1000",
  "$",
  "deposit",
  "20-12-2019"
);
userAnna.createNewTransaction(
  "clothes",
  "3",
  uniqid(),
  "130",
  "$",
  "withdrawal",
  "04-06-2022"
);
userAnna.createNewTransaction(
  "recieve",
  "3",
  uniqid(),
  "700",
  "$",
  "deposit",
  "15-09-2020"
);
userAnna.createNewTransaction(
  "grocery",
  "3",
  uniqid(),
  "320",
  "$",
  "withdrawal",
  "24-09-2021"
);
userAnna.createNewTransaction(
  "utilities",
  "3",
  uniqid(),
  "600",
  "$",
  "withdrawal",
  "14-10-2021"
);
userAnna.createNewTransaction(
  "grocery",
  "3",
  uniqid(),
  "12",
  "$",
  "withdrawal",
  "15-08-2021"
);
userAnna.createNewTransaction(
  "send",
  "4",
  uniqid(),
  "17",
  "$",
  "withdrawal",
  "26-12-2020"
);
userAnna.createNewTransaction(
  "send",
  "4",
  uniqid(),
  "18",
  "$",
  "withdrawal",
  "13-03-2021"
);
userAnna.createNewTransaction(
  "loan",
  "4",
  uniqid(),
  "1999",
  "$",
  "deposit",
  "29-04-2021"
);
userAnna.createNewTransaction(
  "send",
  "3",
  uniqid(),
  "109",
  "$",
  "withdrawal",
  "24-05-2022"
);
userAnna.createNewTransaction(
  "recieve",
  "3",
  uniqid(),
  "3700",
  "$",
  "deposit",
  "16-02-2022"
);
userAnna.createNewTransaction(
  "utilities",
  "4",
  uniqid(),
  "506",
  "$",
  "withdrawal",
  "20-05-2020"
);
userAnna.createNewTransaction(
  "recieve",
  "4",
  uniqid(),
  "560",
  "$",
  "deposit",
  "09-11-2021"
);
userAnna.createNewTransaction(
  "send",
  "3",
  uniqid(),
  "18",
  "$",
  "withdrawal",
  "19-12-2022"
);
userAnna.createNewTransaction(
  "other",
  "3",
  uniqid(),
  "205",
  "$",
  "withdrawal",
  "25-06-2021"
);
userAnna.createNewTransaction(
  "loan",
  "3",
  uniqid(),
  "2600",
  "$",
  "deposit",
  "23-09-2021"
);
userAnna.createNewTransaction(
  "clothes",
  "4",
  uniqid(),
  "130",
  "$",
  "withdrawal",
  "18-07-2020"
);
userAnna.createNewTransaction(
  "clothes",
  "4",
  uniqid(),
  "140",
  "$",
  "withdrawal",
  "04-04-2019"
);
userAnna.createNewTransaction(
  "grocery",
  "4",
  uniqid(),
  "94",
  "$",
  "withdrawal",
  "01-09-2022"
);
userAnna.createNewTransaction(
  "grocery",
  "3",
  uniqid(),
  "113",
  "$",
  "withdrawal",
  "04-10-2020"
);
userAnna.createNewTransaction(
  "grocery",
  "3",
  uniqid(),
  "40",
  "$",
  "withdrawal",
  "05-05-2019"
);
userAnna.createNewTransaction(
  "send",
  "3",
  uniqid(),
  "20",
  "$",
  "withdrawal",
  "17-08-2020"
);
userAnna.createNewTransaction(
  "loan",
  "3",
  uniqid(),
  "3000",
  "$",
  "deposit",
  "08-10-2021"
);
userAnna.createNewTransaction(
  "send",
  "4",
  uniqid(),
  "300",
  "$",
  "withdrawal",
  "10-11-2020"
);
userAnna.createNewTransaction(
  "send",
  "4",
  uniqid(),
  "20",
  "$",
  "withdrawal",
  "11-06-2021"
);
userAnna.createNewTransaction(
  "grocery",
  "4",
  uniqid(),
  "65",
  "$",
  "withdrawal",
  "17-10-2022"
);
userAnna.createNewTransaction(
  "send",
  "3",
  uniqid(),
  "30",
  "$",
  "withdrawal",
  "21-06-2022"
);
userAnna.createNewTransaction(
  "clothes",
  "3",
  uniqid(),
  "100",
  "$",
  "withdrawal",
  "15-10-2020"
);
userAnna.createNewTransaction(
  "grocery",
  "3",
  uniqid(),
  "110",
  "$",
  "withdrawal",
  "28-07-2021"
);

userAnna.createNewTransaction(
  "savings",
  "3",
  uniqid(),
  "200",
  "$",
  "withdrawal",
  "11-05-2022",
  "other"
);
userAnna.createNewTransaction(
  "savings",
  "4",
  uniqid(),
  "50",
  "$",
  "withdrawal",
  "19-04-2022",
  "real-estate"
);
userAnna.createNewTransaction(
  "savings",
  "3",
  uniqid(),
  "100",
  "$",
  "withdrawal",
  "17-09-2022",
  "real-estate"
);
userAnna.createNewTransaction(
  "savings",
  "3",
  uniqid(),
  "90",
  "$",
  "withdrawal",
  "16-10-2020",
  "education"
);
userAnna.createNewTransaction(
  "savings",
  "4",
  uniqid(),
  "70",
  "$",
  "withdrawal",
  "03-05-2021",
  "travel"
);
userAnna.createNewTransaction(
  "savings",
  "4",
  uniqid(),
  "100",
  "$",
  "withdrawal",
  "25-09-2022",
  "travel",
  "education"
);
userAnna.createNewTransaction(
  "savings",
  "4",
  uniqid(),
  "400",
  "$",
  "withdrawal",
  "04-11-2021",
  "health"
);
userAnna.createNewTransaction(
  "savings",
  "3",
  uniqid(),
  "500",
  "$",
  "withdrawal",
  "12-02-2021",
  "travel"
);
userAnna.createNewTransaction(
  "savings",
  "3",
  uniqid(),
  "300",
  "$",
  "withdrawal",
  "12-05-2020",
  "travel"
);
userAnna.createNewTransaction(
  "savings",
  "3",
  uniqid(),
  "40",
  "$",
  "withdrawal",
  "10-03-2020",
  "health"
);
userAnna.createNewTransaction(
  "savings",
  "3",
  uniqid(),
  "80",
  "$",
  "withdrawal",
  "11-02-2021",
  "travel"
);

if (localStorage.getItem("AnnaB@gmail.com") === null) {
  localStorage.setItem("AnnaB@gmail.com", JSON.stringify(userAnna));
}
