import { Card, CardBody } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

type AdminCardProps = {
  heading: string;
  to: string;
  description?: string;
};

function AdminCard({ heading, to, description = ' ' }: AdminCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={ () => navigate(`/admin/${to}`) }
      className="w-80 lg:w-[37rem] lg:h-[17rem] m-4 select-none
      cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
    >
      <CardBody className="flex flex-col">
        <div className="flex justify-between mb-10">
          <h2
            className="text-xl lg:text-2xl font-semibold text-btn-orange"
          >
            {heading}
          </h2>
        </div>
        <div
          aria-hidden="true"
          className="lg:text-3xl font-semibold"
        >
          {description}
        </div>
      </CardBody>
    </Card>
  );
}

export default AdminCard;
