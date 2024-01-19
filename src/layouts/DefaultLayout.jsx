import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default DefaultLayout;
