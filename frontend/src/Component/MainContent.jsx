import { useState } from "react";
// import Cards from "./Cards";


export default function MainContent() {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let day = newDate.getDay() - 1;

  // Array containing weeks
  const dayOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  // Array containing month
  const selectMonth = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  // Const for storing day format : YYYY-MM-DD for Calendar value
  let today = `${year}-${month.toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}`;
  const [dateValue, setDateValue] = useState(today);

  //useState for updating calendar date
  function dateHandler(event) {
    setDateValue((prevValue) => event.target.value);
  }

  // For getting exact day in words and sentences
  const getCurrentDate = () =>
    `${dayOfWeek[day]}  ${date} ${
      selectMonth[month - 1]
    } ${year} il est : ${hours}:${minutes}`;

  return (
    <>
      <div className="child--content">
        <div className="child--inner">
          <div className="profil-pic">
            {/* <img src="./ai.png" alt="profil picture" /> */}
          </div>
          <div className="details">
            <p>Bonjour Admin</p>
            <p>Nous sommes le {getCurrentDate()}</p>
            <p>Enfants présent en crèche : 7 </p>
          </div>
        </div>
      </div>
      <label htmlFor="start">Choisir date:</label>

      <input
        type="date"
        id="start"
        name="show-day"
        value={dateValue}
        onChange={dateHandler}
        min="2024-01-01"
        max="2026-12-31"
      />
      {/* <Cards value="0" />
      <Cards value="1" />
      <Cards value="2" />
      <Cards value="3" />
      <Cards value="4" /> */}
      <Cards2 />
      <Cards2 />
      <Cards2 />
    </>
  );
}
