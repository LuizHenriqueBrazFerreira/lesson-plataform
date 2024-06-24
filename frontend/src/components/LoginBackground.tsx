type Children = {
  children: React.ReactNode;
};

function LoginBackground({ children }: Children) {
  return (
    <section className="bg-image-login bg-cover h-[90vh] font-['Nunito']">
      <div className="bg-bg-login w-full h-full flex justify-center items-center">
        { children }
      </div>
    </section>
  );
}

export default LoginBackground;
