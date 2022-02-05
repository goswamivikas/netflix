import Featured from "components/Featured";
import Navbar from "components/Navbar";

export const Home: React.FC = () => {
  return (
    <div className="myhome bg-[#141414] text-gray-700">
      <Navbar />
      <Featured type="movie" />
    </div>
  );
};
