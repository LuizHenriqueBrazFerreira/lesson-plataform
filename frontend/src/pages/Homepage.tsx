import HomeBackground from '../components/HomeBackground';

function Homepage() {
  return (
    <main>
      <HomeBackground>
        {' '}
      </HomeBackground>
      <section className="flex flex-col py-4 h-screen">
        <img
          className="self-center"
          src="/src/assets/infografico.png"
          alt="infográfico"
        />
      </section>
    </main>
  );
}

export default Homepage;
