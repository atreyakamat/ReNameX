import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 pb-4 text-center text-sm text-violet-200/60">
      <p>
        ReNameX is open source ·{' '}
        <a
          href="https://github.com/atreyakamat/ReNameX"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-300 hover:text-white underline-offset-4 hover:underline transition-colors"
        >
          View on GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
