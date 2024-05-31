import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestData } from '../services/requests';
import OrangeButton from '../components/OrangeButton';
import CoursesBackground from '../components/CoursesBackground';

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [module, setModule] = useState([]);

  const navigate = useNavigate();

  const { moduleId } = useParams();

  return (
    <CoursesBackground>
      <div className="self-start">
        <h1
          className="text-2xl lg:text-4xl
            text-btn-orange font-bold"
        >
          Aulas
        </h1>
      </div>
    </CoursesBackground>
  );
}

export default Lessons;
