import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Categories from './components/Categories';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Categories />
      <ProductList />
      <Footer />
    </div>
  );
}

export default App;
