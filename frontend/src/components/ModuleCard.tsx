import { Card, CardBody, Progress, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Module } from '../types/courseType';

type ModuleCardProps = {
  module: Module;
};

function ModuleCard({ module }: ModuleCardProps) {
  const userId = localStorage.getItem('userId');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const lessonsUrl = `/courses/${module.courseId}/modules/${module.id}/lessons`;

  return (
    <Card
      className="w-80 md:w-[37rem] md:h-[17rem] m-4 select-none
      cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2
            className="text-xl md:text-2xl font-semibold text-btn-orange"
          >
            Módulo
          </h2>
        </div>
        <div
          onClick={ () => navigate(lessonsUrl) }
          aria-hidden="true"
          className="md:text-3xl font-semibold"
        >
          {module.title}
          <div className="mt-20 flex items-center gap-4">
            <Progress
              size="sm"
              color="orange"
              value={ progress }
            />
            <Typography className="font-semibold">
              {progress}
              %
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default ModuleCard;
