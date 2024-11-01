import React from 'react';
import Social from './Social';

const Home = () => {
  return (
    <main className="l-main bd-grid">
      <section className="home">
        <div className="home__information">
          <p className="home__pressent anime-text">Hi, Welcome! As you know, I'm</p>
          <p className="home__pressent2 anime-text">
            if you don't know me, how tf you got here.
          </p>

          <h1 className="home__title anime-text">Parth R. Katke</h1>
          <p className="home__skill anime-text">A Software Developer</p>

          <div>
            <a 
              href="#download-cv" 
              className="home__button anime-text"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>

        <div className="home__img">
          <img src="/assets/img/img.jpg" alt="Parth R. Katke" />
        </div>

        <Social />
      </section>
    </main>
  );
};

export default Home;