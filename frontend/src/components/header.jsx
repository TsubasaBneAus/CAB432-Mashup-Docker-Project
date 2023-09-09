import { useRouter } from "next/navigation";

const Header = (props) => {
  const router = useRouter();
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
      return <p className="text-xl text-slate-800">Search Weather & News</p>;
    }
  };
  return (
    <header className="mb-3 flex w-auto justify-around bg-slate-800 py-1 text-white shadow-xl">
      <button
        className="text-4xl font-semibold text-white hover:text-slate-400"
        onClick={() => router.push("/")}
      >
        Today's Dashboard
      </button>
      {displayLinks()}
    </header>
  );
};

export default Header;
