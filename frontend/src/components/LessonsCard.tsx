import { Card, CardBody, Checkbox } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { LessonsType } from '../types/lessons';

type LessonsCardProps = {
  lesson: LessonsType;
  lessonsUrl: string;
};

function LessonsCard({ lesson, lessonsUrl }: LessonsCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="w-80 lg:w-[37rem] lg:h-[17rem] m-4 select-none
                cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2 className="text-xl lg:text-2xl font-semibold text-btn-orange">Aula</h2>
          <div className="flex items-center text-xl font-semibold">
            Já assisti?
            <Checkbox
              crossOrigin={ undefined }
              color="orange"
              onChange={ () => console.log('checkbox clicked') }
            />
          </div>
        </div>
        <div
          onClick={ () => navigate(`${lessonsUrl}/${lesson.id}`) }
          aria-hidden="true"
          className="lg:text-3xl font-semibold"
        >
          {lesson.title}
        </div>
      </CardBody>
    </Card>
  );
}
export default LessonsCard;
