import React from 'react';

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center footer-bottom ">
        Copyright &copy; {new Date().getFullYear()} 
        <span className="ml-1">
            <a className="btn-link text-white btn-b-border-light" href="https://thegoodartisan.com" rel="nofollow">TheGoodArtisan</a>
        </span>
    </footer>
  );
}; 
