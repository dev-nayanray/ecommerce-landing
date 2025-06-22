import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Flashsale from './components/Flashsale';
import Newarrivals from './components/Newarrivals';
import Processsteps from './components/Processsteps';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Video from './components/Video';
import Blog from './components/Blog';
import Newsletter from './components/Newsletter';
import FAQ from './components/FAQ';
import UserCounts from './components/Usercounts';

import Product from './pages/Product';
import Category from './pages/Category';
import Contact from './pages/Contact';
import TermsPrivacy from './pages/TermsPrivacy';
import Returnpolicy from './pages/Returnpolicy';
import AboutUs from './pages/AboutUs';
import FAQPage from './pages/FAQ';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfile';
import SingleProduct from './pages/SingleProduct';

function Home() {
  return (
    <>
      <Hero />
      <Category />
      <Flashsale />
      <Product />
      <Newarrivals />
      <Processsteps />
      <Testimonials />
      <Partners />
      <Video />
      <Blog homeView={true} />
      <Newsletter />
      <FAQ homeView={true} />
      <UserCounts />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-privacy" element={<TermsPrivacy />} />
          <Route path="/return-policy" element={<Returnpolicy />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
