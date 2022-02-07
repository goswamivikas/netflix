import Featured from "components/Featured";
import List from "components/List";
import Navbar from "components/Navbar";

export const Home: React.FC = () => {
  return (
    <div className="myhome overflow-hidden bg-[#141414] text-gray-700">
      <Navbar />
      <Featured type="movie" />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};
