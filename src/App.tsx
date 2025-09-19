import './App.css';
import Footer from './components/Footer/Footer';
import Banner from './components/Banner/Banner';
import About from './components/About/About';
import Hero from './components/Hero/Hero';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <>
      <Hero />
      <Banner
        title="Best game ever"
        subtitle="minecraft is my life"
        buttonText="Join"
        leftIcon="/images/gamepad.svg"
        rightImage="/images/minecraft.png"
      />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
