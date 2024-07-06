type HeaderSectionProps = {
  heading: string;
  title: string;
};

function HeaderSection({ heading, title }: HeaderSectionProps) {
  return (
    <section
      className="md:w-[81rem] w-screen bg-white rounded-2xl mb-8 flex
      flex-col px-[2rem] py-[1rem] md:py-[2rem] gap-2 md:gap-6"
    >
      <h1 className="text-2xl md:text-4xl text-btn-orange font-bold">
        {heading}
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold">
        {title}
      </h2>
    </section>
  );
}

export default HeaderSection;
