import ForumButton from './ForumButton';

type HeaderSectionProps = {
  heading: string;
  title: string;
};

function HeaderSection({ heading, title }: HeaderSectionProps) {
  return (
    <section
      className="md:w-[81rem] w-screen bg-white rounded-2xl mb-8 flex
      flex-col md:flex-row text-sm justify-between items-center px-[2rem]
      py-[1rem] md:py-[2rem]"
    >
      <div className="flex flex-col gap-2 md:gap-6 self-start">
        <h1 className="text-2xl md:text-4xl text-btn-orange font-bold">
          {heading}
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold">
          {title}
        </h2>
      </div>
      <ForumButton />
    </section>
  );
}

export default HeaderSection;
