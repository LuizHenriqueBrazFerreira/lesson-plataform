type Children = {
  children: React.ReactNode;
};

function HomeBackground({ children }: Children) {
  return (
    <div
      className="bg-image-login bg-cover h-[90vh]
      font-['Nunito'] flex justify-center items-center"
    >
      { children }
    </div>
  );
}

export default HomeBackground;
