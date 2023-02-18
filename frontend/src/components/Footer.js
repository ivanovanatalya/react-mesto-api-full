function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer lang="en" className="footer">
      <p className="footer__author">&copy; {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;