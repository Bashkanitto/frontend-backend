import './App.css';
import Footer from './components/Footer/Footer';
import Banner from './components/Banner/Banner';
import Header from './components/Header/Header';
import About from './components/About/About';

function App() {
  return (
    <>
      <Header />
      <Banner
        title="typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        subtitle="bbb"
        buttonText="View"
        leftIcon="/images/gamepad.svg"
        rightImage="/images/minecraft.png"
      />
      <About />
      <Footer />
    </>
  );
}

export default App;
