import { Card, CardBody } from '@material-tailwind/react';

function LoadingCard() {
  return (
    <Card
      className="w-80 md:w-[37rem] md:h-[17rem] m-4 bg-neutral-200 animate-pulse"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <div className="rounded-lg w-44 h-4 bg-neutral-400 animate-pulse" />
          <div className="flex items-center">
            <div className="rounded-lg w-14 h-4 bg-neutral-400 animate-pulse" />
          </div>
        </div>
        <div
          className="grow h-[9rem] flex flex-col gap-4"
        >
          <div className="rounded-lg w-full h-4 bg-neutral-400 animate-pulse" />
          <div className="rounded-lg w-full h-4 bg-neutral-400 animate-pulse" />
          <div className="rounded-lg w-full h-4 bg-neutral-400 animate-pulse" />
          <div className="rounded-lg w-full h-4 bg-neutral-400 animate-pulse" />
          <div className="rounded-lg w-44 h-4 bg-neutral-400 animate-pulse" />
        </div>
      </CardBody>
    </Card>
  );
}

export default LoadingCard;
