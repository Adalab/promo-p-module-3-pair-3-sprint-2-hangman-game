import "../styles/Header.scss";

const Header = (props) => {
  return (
    <header>
      <h1 className={props.className}>{props.text}</h1>
    </header>
  );
};

export default Header;
