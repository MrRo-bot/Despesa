import Cards from "./Cards";
import Header from "../components/Header";
import TransactionForm from "../components/TransactionForm";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="text-2xl font-bold font-heading text-center relative z-50 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text py-1">
            Spend wisely, live well
          </p>
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default Home;
