import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import './index.css';

interface MenuItem {
  key: string;
  label: string;
  path: string;
}

interface MenuProps {
  menuItems: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  // Close menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && menuOpen) {
      setMenuOpen(false);
    }
  }, [isMobile, menuOpen]);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleMenuItemClick = () => {
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  if (!menuItems || menuItems.length < 2) {
    <div className="menu-container">
      <div className="menu-item logo-item">
        <Link to="/" className="logo-link">KinoDev</Link>
      </div>
      <div className="right-menu-items"></div>
    </div>
  }


  return (
    <div className="menu-container">
      {isMobile ? (
        <>
          <button
            className="menu-burger-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {menuOpen && (
            <div className="mobile-menu">
              <div className="menu-items">
                {menuItems.map((item, index) => (
                  <div
                    key={item.key}
                    className={`menu-item ${index === 0 ? 'logo-item' : ''} ${isActive(item.key) ? 'active' : ''}`}
                  >
                    <Link
                      to={item.path}
                      onClick={handleMenuItemClick}
                      className={index === 0 ? 'logo-link' : ''}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>) : (<nav className="desktop-menu">
          <div className="menu-items">
            <div className="menu-item logo-item">
              <Link to="/" className="logo-link">KinoDev</Link>
            </div>

            <div className="right-menu-items">
              {menuItems.slice(1).map((item) => (
                <div key={item.key} className={`menu-item ${isActive(item.key) ? 'active' : ''}`}>
                  <Link to={item.path}>{item.label}</Link>
                </div>
              ))}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Menu;
