type Children = {
  children: React.ReactNode;
};

function HomeBackground({ children }: Children) {
  return (
    <section
      className="bg-image-login bg-cover h-[90vh]
      font-['Nunito'] flex justify-center items-center"
    >
      { children }
    </section>
  );
}

export default HomeBackground;
