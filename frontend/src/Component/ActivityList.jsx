// ActivityList.js
import { useEffect, useState } from "react";
import { getActivitiesByChildId } from "../services/activityServices";
import Cards2 from "./Cards2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild } from "@fortawesome/free-solid-svg-icons";

export default function ActivityList({ childId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivitiesByChildId(childId);
        setActivities(data.data);
        console.log(data.data);
      } catch (error) {
        setError("Error fetching activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [childId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  console.log(activities);
  return (
    <div className="activity--cards">
      <div className="child--info">
        <FontAwesomeIcon
          icon={faChild}
          style={{ fontSize: "2em", color: "black", margin: "15px" }}
        />
        <h2 style={{ margin: "15px" }}>
          Enfant : {activities[0].Child.prenom + ` ` + activities[0].Child.nom}
        </h2>
      </div>
      {activities.map((activity) => (
        <Cards2
          key={activity.id}
          activity={activity.activity}
          createdAt={activity.createdAt}
          autres={activity.autres}
        />
      ))}
    </div>
  );
}
