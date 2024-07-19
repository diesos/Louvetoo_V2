import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import Pic from "../assets/Ozturk357.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function ProfileCard() {
  return (
    <Card className="w-96 flex">
      <CardHeader floated={false} className="h-80">
        <img src={Pic} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Omer Ozturk
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          Full stack Web Developper
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip color="light" content="Github">
          <a
            href="http://github.com/diesos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

export default ProfileCard;
