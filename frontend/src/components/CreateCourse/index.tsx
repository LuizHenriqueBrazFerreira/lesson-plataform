import Course from '../Course';

function CreateCourse() {
  return (
    <div className="inline-flex">
      <section
        className="inline-flex justify-center absolute top-[19%] right-[10%] w-1/4 "
      >
        <Course />
      </section>
    </div>
  );
}

export default CreateCourse;
