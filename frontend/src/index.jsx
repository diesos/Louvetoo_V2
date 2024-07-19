import "./index.css";
import { Link } from "react-router-dom";
import Caroussel from "./Component/Caroussel";
import CardDefault from "./Component/CardDefault";
import feat1 from "./assets/feat1.png";
import feat2 from "./assets/feat2.png";
import feat3 from "./assets/feat3.png";
import ProfileCard from "./Component/InfoCards";
import CollapseEl from "./Component/Collapse";
// import { Button } from "@material-tailwind/react";

const IndexPage = () => {
  return (
    <div className="container m-auto">
      <h1 className="text-5xl text-center font-bold p-2">Louvetoo</h1>
      <Caroussel />
      <div style={{ position: "relative" }}></div>
      <div className="flex justify-center gap-10 flex-wrap">
        <CardDefault
          Text="Restez en contact avec les employé(e)s de votre crèche."
          TitleText="Soyez informée"
          ButtonText="En savoir +"
          imgUrl={feat1}
        />
        <CardDefault
          Text="Restez informée de la journée de votre enfant. Dans les moindre détails"
          TitleText="Soyez impliquée"
          ButtonText="En savoir +"
          imgUrl={feat2}
        />
        <CardDefault
          TitleText="Soyez prêt"
          Text="Tenez vous informée des journées à venir de votre enfant."
          ButtonText="En savoir +"
          imgUrl={feat3}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <CollapseEl />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <ProfileCard />

      </div>
    </div>
  );
};

export default IndexPage;
