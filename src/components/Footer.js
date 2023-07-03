'use client'

import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className='dark'>
      <section id='footer'>
        <button onClick={() => { document.body.scrollIntoView() }}>Back to top</button>
      </section>
    </div>
  );
}

export default Footer;