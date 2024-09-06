import { useState } from "react";
// import Cards from "./Cards";
// import ChildCards from "./ChildCards";
// import Cards2 from "./Cards2";
import ActivityList from "./ActivityList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect } from "react";
import { fetchUserInfo } from "../services/userSelfServices";
import { fetchUserChild } from "../services/userChildServices";

export default function MainContent() {
  const token = useAuthHeader();

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let day = newDate.getDay() - 1;
  // const token  = useSignIn();
  const [userInfo, setUserInfo] = useState(null);
  const [userChild, setUserChild] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const [usersData, usersChild] = await Promise.all([
          fetchUserInfo(token),
          fetchUserChild(token),
        ]);
        setUserInfo(usersData);
        setUserChild(usersChild);
      } catch (error) {
        console.error("Error: Failed to fetch user data :", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

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
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: "2em", color: "white" }}
            />
            {/* <img src="./ai.png" alt="profil picture" /> */}
          </div>
          <div className="details">
            {!loading ? (
              <p>
                Bienvenue, {userInfo.prenom} {userInfo.nom}!
              </p>
            ) : (
              <p>Bienvenue!</p>
            )}
            <p>Nous sommes le {getCurrentDate()}</p>
            <p>Enfants présent en crèche : 7 </p>
          </div>
        </div>
      </div>
      {!loading && (
        <div>
          {userChild.children.length === 0 ? (
            <div style={{ backgroundColor: "#3333" }}>
              <p style={{ textAlign: "center" }}>
                Pas d'enfant liée à votre compte
              </p>
              <p style={{ textAlign: "center", alignItems:'center'}}>
                <a href="mailto:contact@admin.com">
                  Veuillez contacter un staff
                </a>
              </p>
            </div>
          ) : (
           
             <ActivityList childId={userChild.children[0].id} />
          )}
        </div>
      )}
    </>
  );
}
