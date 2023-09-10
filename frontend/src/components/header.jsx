const Header = (props) => {
  const displayLinks = () => {
    if (props.usedPage == "/") {
      return (
        <button
          className="text-xl text-white hover:text-slate-400"
          onClick={() => props.setModalState(true)}
        >
          Search Weather & News
        </button>
      );
    } else {
      return (
        <h1 className="text-xl invisible">Search Weather & News</h1>
      );
    }
  };
  return (
    <header className="flex w-auto justify-around bg-slate-800 py-1 text-white shadow-xl">
      <button
        className="text-4xl font-semibold text-white hover:text-slate-400"
        onClick={() => window.open("/", "_self")}
      >
        Today's Dashboard
      </button>
      {displayLinks()}
    </header>
  );
};

export default Header;
