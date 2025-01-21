import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginActive = location.pathname === '/';
  const isSignupActive = location.pathname === '/sign_up';

  return (
    <header className="bg-[#043864]">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6 ">
        <div className="flex items-center">
          <Link to="/">
            <img 
              src="/src/assets/nex-logo.png" 
              alt="Nexus Ventures" 
              className="h-9 md:h-14"
            />
          </Link>
        </div>
        <div className="flex md:gap-4 gap-2">
          <button onClick={() => navigate('/')} 
              className={`md:px-4 md:py-2 px-2 py-1 ${
                isLoginActive
                  ? 'text-[#043864] hover:text-gray-200 bg-white hover:bg-[#043864] border hover:border-white'
                  : 'border border-white text-white hover:bg-white hover:text-[#043864] transition-colors'
              }`}
            >
            Login
          </button>
          <button onClick={() => navigate('/sign_up')} 
            className={`md:px-4 md:py-2 px-2 py-1 ${
              isSignupActive
                ? 'text-[#043864] hover:text-gray-200 bg-white hover:bg-[#043864] border hover:border-white'
                : 'border border-white text-white hover:bg-white hover:text-[#043864] transition-colors'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;