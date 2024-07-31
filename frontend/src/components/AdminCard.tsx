import { Card, CardBody } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

type AdminCardProps = {
  heading: string;
  to: string;
  description: string;
};

function AdminCard({ heading, to, description }: AdminCardProps) {
  const navigate = useNavigate();

  const path = `/admin/${to}`;

  const coursesPath = '/courses';

  return (
    <Card
      className="w-96 md:w-[37rem] md:h-44 m-4 select-none
      cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
      onClick={ () => (to === 'courses' ? navigate(coursesPath) : navigate(path)) }
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2
            className="text-xl md:text-2xl font-semibold text-btn-orange"
          >
            {heading}
          </h2>
        </div>
        <div
          aria-hidden="true"
          className="md:text-3xl font-semibold"
        >
          {description}
        </div>
      </CardBody>
    </Card>
  );
}

export default AdminCard;
