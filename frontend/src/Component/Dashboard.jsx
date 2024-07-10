// import { useState } from "react";
// import Cards from "./Cards";

// export default function MainContent() {
//   let newDate = new Date();
//   let date = newDate.getDate();
//   let month = newDate.getMonth() + 1;
//   let year = newDate.getFullYear();
//   let hours = newDate.getHours();
//   let minutes = newDate.getMinutes();
//   let day = newDate.getDay() - 1;

//   // Array containing weeks
//   const dayOfWeek = [
//     "Lundi",
//     "Mardi",
//     "Mercredi",
//     "Jeudi",
//     "Vendredi",
//     "Samedi",
//     "Dimanche",
//   ];
//   // Array containing month
//   const selectMonth = [
//     "Janvier",
//     "Février",
//     "Mars",
//     "Avril",
//     "Mai",
//     "Juin",
//     "Juillet",
//     "Août",
//     "Septembre",
//     "Octobre",
//     "Novembre",
//     "Décembre",
//   ];

//   // Const for storing day format : YYYY-MM-DD for Calendar value
//   let today = `${year}-${month.toString().padStart(2, "0")}-${date
//     .toString()
//     .padStart(2, "0")}`;
//   const [dateValue, setDateValue] = useState(today);

//   //useState for updating calendar date
//   function dateHandler(event) {
//     setDateValue((prevValue) => event.target.value);
//   }

//   console.log("Dashboard.jsx");

//   // For getting exact day in words and sentences
//   const getCurrentDate = () =>
//     `${dayOfWeek[day]}  ${date} ${
//       selectMonth[month - 1]
//     } ${year} il est : ${hours}:${minutes}`;

//     const [user, setUser] = useState(null);

//     // const handleProfile = async (e) => {
//     //   if (e) e.preventDefault();
//     //   try {
//     //     const response = await axios.get("/api/getuser/{id}", {
//     //       headers: {
//     //         Authorization: `Bearer ${localStorage.getItem("token")}`,
//     //       },
//     //     });
//     //     catch(error) {
//     //       console.error("Error fetching user profile:", error);
//     //     }
//     //     finally {
//     //       console.log("Finally");
//     //     }
//     //   };
//     //   }
//     // setUser(response.data);

//   return (
//     <>
//       <div className="child--content">
//         <div className="child--inner">
//           <div className="profil-pic">
//             <img src="./ai.png" alt="profil picture" />
//           </div>
//           <div className="details">
//             <p>Bonjour Omer</p>
//             <p>Nous sommes le {getCurrentDate()}</p>
//             <p>Enfants : 14 (Recordman du nombre d'enfants)</p>
//           </div>
//         </div>
//       </div>
//       <label htmlFor="start">Start date:</label>

//       <input
//         type="date"
//         id="start"
//         name="show-day"
//         value={dateValue}
//         onChange={dateHandler}
//         min="2024-01-01"
//         max="2026-12-31"
//       />
//       <Cards value="2" />
//       <Cards value="2" />
//       <Cards value="0" />
//       <Cards value="4" />
//       <Cards value="4" />
//     </>
//   );
// }

import { useState, useRef } from "react";
import { Link } from "react-router-dom";
// import Cards from "./Cards";
// import ChildCards from "./ChildCards";
// import Cards2 from "./Cards2";
import ActivityList from './ActivityList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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

    const childId = 4;

  return (
    <>

      <div className="child--content">
        <div className="child--inner">
          <div className="profil-pic">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "2em", color: "white" }} />
            {/* <img src="./ai.png" alt="profil picture" /> */}
          </div>
          <div className="details">
            <p>Bonjour</p>
            <p>Nous sommes le {getCurrentDate()}</p>
            <p>Enfants présent en crèche : 7 </p>
          </div>
        </div>
      </div>
      {/* <div style={{display:'flex', justifyContent:'center', gap: '15px  ', margin:'15px'}}> */}
      {/* <label htmlFor="start">Choisir date:</label> */}
{/* <ChildCards id="1" prenom="Rames" nom="Rodriguez" date_naissance="2022-07-05" allergie="Arbres" diet="Sans gluten" />
<ChildCards id="2" prenom="Jean" nom="Dupont" date_naissance="2023-07-05" allergie="Pollen" diet="Sans gluten" />
<ChildCards id="3" prenom="Marie" nom="Martin" date_naissance="2022-07-05" allergie="Aucune" diet="Végétarienne" />
<ChildCards id="4" prenom="Ricardo" nom="Anis" date_naissance="2022-07-05" allergie="Aucune" diet="Sans lactose" />
<ChildCards id="5" prenom="Omer" nom="Ozturk" date_naissance="2022-07-05" allergie="Aucune" diet="Aucune" />
<ChildCards id="6" prenom="Rodrigo" nom="Durand" date_naissance="2022-07-05" allergie="Aucune" diet="Aucune" /> */}
{/* <Cards2 /> */}
<ActivityList childId={childId} />

      {/* <input
        type="date"
        id="start"
        name="show-day"
        value={dateValue}
        onChange={dateHandler}
        min="2024-01-01"
        max="2026-12-31"
      /> */}
      {/* <Cards value="0" />
      <Cards value="1" />
      <Cards value="2" />
      <Cards value="3" />
      <Cards value="4" /> */}
    </>
  );
}
