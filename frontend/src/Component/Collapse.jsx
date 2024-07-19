import React from "react";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";


export default function CollapseDefault() {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button onClick={toggleOpen}>Derrière le projet</Button>
      <Collapse open={open}>
        {open && (
          <div className="p-4">
            <Card className="my-4 mx-auto w-8/12">
              <CardBody>
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
