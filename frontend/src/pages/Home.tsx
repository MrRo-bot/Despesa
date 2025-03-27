import Cards from "../components/transactions/Cards";
import LoginHeader from "../components/authentication/LoginHeader";
import TransactionForm from "../components/TransactionForm";

const Home = () => {
  return (
    <>
      <LoginHeader />
      <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center justify-center gap-6">
        <div className="flex items-center">
          <p className="font-heading relative z-50 inline-block bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text py-1 text-center text-2xl font-bold text-transparent">
            Spend wisely, live well
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default Home;
