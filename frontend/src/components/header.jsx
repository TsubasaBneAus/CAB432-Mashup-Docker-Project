const Header = (props) => {
  return (
    <header className="mb-5 flex w-screen justify-around bg-slate-800 py-1 text-white shadow-xl">
      <button
        className="text-4xl font-semibold text-white hover:text-slate-400"
        onClick={() => props.fetchDataWithCoords()}
      >
        Today's Dashboard
      </button>
      <button
        className="text-xl text-white hover:text-slate-400"
        onClick={() => props.setModalState(true)}
      >
        Search Weather & News
      </button>
    </header>
  );
};

export default Header;
