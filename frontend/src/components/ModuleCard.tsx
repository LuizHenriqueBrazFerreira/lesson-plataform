import { Card, CardBody, Progress, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

type ModuleCardProps = {
  module: any;
};

function ModuleCard({ module }: ModuleCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="w-80 lg:w-[37rem] lg:h-[17rem] m-4 select-none
                cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2
            className="text-xl lg:text-2xl font-semibold text-btn-orange"
          >
            Módulo
          </h2>
        </div>
        <div
          onClick={ () => navigate(`/courses/${module.courseId}/modules`) }
          aria-hidden="true"
          className="lg:text-3xl font-semibold"
        >
          {module.title}
          <div className="mt-8 flex items-center gap-4">
            <Progress
              size="sm"
              color="orange"
              value={ module.progress }
            />
            <Typography className="font-semibold">
              {module.progress}
              %
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default ModuleCard;
