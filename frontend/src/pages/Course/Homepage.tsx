import HomeBackground from '../../components/HomeBackground';

function Homepage() {
  return (
    <main>
      <HomeBackground>
        <div
          className="w-[60%] h-[70%] opacity-50 bg-white
        flex flex-col px-[2rem] py-[3rem] rounded-2xl"
        />
      </HomeBackground>
      <section className="flex flex-col py-4 h-screen">
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
