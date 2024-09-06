import React from "react";

export default function Cards2(props) {
  const { activity, createdAt, autres, id } = props;

  const actionArray = selectActivity(activity);
  const date = new Date(createdAt);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  function selectActivity(activity) {
    switch (activity) {
      case "entree":
        return ["Entrée", "Arrivée de l'enfant à la crèche"];
      case "sortie":
        return ["Sortie", "Départ de l'enfant de la crèche"];
      case "dodo":
        return ["Dodo", "a dormi"];
      case "repas":
        return ["Repas", "a déjeuné"];
      case "change":
        return ["Change", "Changement de couche"];
      case "loisir":
        return ["Loisir", "a pratiqué une activité"];
      case "autre":
        return ["Autre", autres];
      default:
        return ["", ""];
    }
  }

  console.log(activity);
  return (
    <div className={`card --${activity}`}>
      <div className="card-header">
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>
      <div className="card-body">
        <div className="icon">
          <div className="icon-inner"></div>
        </div>
        <div className="card-content">
          <h3>{actionArray[0]}</h3>
          <p>{actionArray[1]}</p>
        </div>
      </div>
    </div>
  );
}
