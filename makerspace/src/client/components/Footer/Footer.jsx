// Footer.js
import css from './footer.module.css';
const Footer = () => {
  return (
    <footer className={` ${css.footer}  bg-gray-800 text-white py-12`}>
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center">© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;