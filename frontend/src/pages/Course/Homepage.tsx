import HomeBackground from '../../components/HomeBackground';

function Homepage() {
  return (
    <main>
      <HomeBackground>
        <div
          className="md:w-[60%] h-[70%] opacity-50 bg-white
        flex flex-col px-[2rem] py-[3rem] rounded-2xl"
        >
          <h1 className="text-4xl font-bold text-center">
            Bem-vindo ao curso!
          </h1>
        </div>
      </HomeBackground>
      <section className="flex flex-col py-4">
        <img
          className="self-center"
          src="/assets/infografico.png"
          alt="infográfico"
        />
      </section>
    </main>
  );
}

export default Homepage;
