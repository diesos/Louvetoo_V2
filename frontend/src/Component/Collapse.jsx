import React from "react";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

export default function CollapseDefault() {
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("fr");

  const toggleOpen = () => setOpen((cur) => !cur);
  const toggleLanguage = () => setLanguage((cur) => (cur === "fr" ? "en" : "fr"));

  return (
    <>
      <div className="">
        <Button onClick={toggleOpen}>Derrière le projet</Button>
        <Button onClick={toggleLanguage}>
          <FontAwesomeIcon icon={faFlag} /> {language === "fr" ? "EN" : "FR"}
        </Button>
      </div>
      <Collapse open={open}>
        {open && (
          <div className="bg-gray-100 p-4">
            <Card className="my-4 mx-auto w-8/12">
              <CardBody>
                {language === "fr" ? (
                  <Typography>
                    Ce projet a été réalisé par un seul membre : Omer Ozturk.
                    L'idée m'est venue par une expérience personnelle. En effet, j'ai été confronté à un problème de communication avec la crèche de mon enfant.
                    Je me suis donc dit que je pourrais créer une application qui permettrait aux parents de rester informés de la journée de leur enfant.
                    Le but de cette application est de permettre aux parents de rester informés de la journée de leur enfant, de suivre la vie à la crèche de leur enfant et de participer à la vie de la crèche.
                    J'ai donc décidé de créer cette application. Voici les technologies que j'ai utilisées :
                    J'ai utilisé React pour la partie front-end et NodeJS + Express pour la partie back-end.
                    J'ai utilisé Tailwind CSS pour le design de l'application.
                    J'ai utilisé MySql pour la base de données.
                    J'ai utilisé Netlify pour le déploiement de l'application.
                    J'ai utilisé Git et GitHub pour le versionning du code.
                    J'ai utilisé Postman pour tester.
                    J'ai utilisé VS Code comme éditeur de code.
                    J'ai utilisé Figma pour le design de l'application.
                    J'ai utilisé Trello pour la gestion de projet.
                  </Typography>
                ) : (
                  <Typography>
                    This project was created by a single member: Omer Ozturk.
                    The idea came from a personal experience. Indeed, I faced a communication problem with my child's daycare.
                    So I thought I could create an application that would allow parents to stay informed about their child's day.
                    The goal of this application is to allow parents to stay informed about their child's day, to follow their child's life at daycare, and to participate in the daycare's life.
                    So I decided to create this application. Here are the technologies I used:
                    I used React for the front-end part and NodeJS + Express for the back-end part.
                    I used Tailwind CSS for the design of the application.
                    I used MySql for the database.
                    I used Netlify for deploying the application.
                    I used Git and GitHub for versioning the code.
                    I used Postman for testing.
                    I used VS Code as a code editor.
                    I used Figma for the design of the application.
                    I used Trello for project management.
                  </Typography>
                )}
                <div className="mt-4">
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </Collapse>
    </>
  );
}
