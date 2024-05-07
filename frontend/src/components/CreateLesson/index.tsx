import Lesson from '../Lesson';

function CreateLesson() {
  return (
    <div className="inline-flex">
      <section
        className="inline-flex justify-center absolute top-[19%] right-[10%] w-1/4 "
      >
        <Lesson newLesson />
      </section>
    </div>
  );
}

export default CreateLesson;
