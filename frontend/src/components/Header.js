function Header({ children }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
        {children}
      <div>
      </div>
    </header >
  );
}

export default Header;