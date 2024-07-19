import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function CardDefault(props) {

  const { Text, TitleText, ButtonText, imgUrl } = props;
  return (
    <div className="mt-10">
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={imgUrl}
          alt="card-image"
          className="w-full h-full object-cover object-center"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {TitleText}
        </Typography>
        <Typography>
         {Text}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>{ButtonText}</Button>
      </CardFooter>
    </Card>
    </div>
  );
}

export default CardDefault;
