type Children = {
  children: React.ReactNode;
};

function LoginBackground({ children }: Children) {
  return (
    <div className="bg-image-login bg-cover w-screen h-[90vh] font-['Nunito']">
      <div className="bg-bg-login w-full h-full flex justify-center items-center">
        { children }
      </div>
    </div>
  );
}

export default LoginBackground;
