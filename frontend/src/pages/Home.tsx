// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";

// ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  // const chartData = {
  //   labels: ["Saving", "Expense", "Investment"],
  //   datasets: [
  //     {
  //       label: "%",
  //       data: [13, 8, 3],
  //       backgroundColor: [
  //         "rgba(75, 192, 192)",
  //         "rgba(255, 99, 132)",
  //         "rgba(54, 162, 235)",
  //       ],
  //       borderColor: [
  //         "rgba(75, 192, 192)",
  //         "rgba(255, 99, 132)",
  //         "rgba(54, 162, 235, 1)",
  //       ],
  //       borderWidth: 1,
  //       borderRadius: 30,
  //       spacing: 10,
  //       cutout: 130,
  //     },
  //   ],
  // };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center h-[70vh]">
        <div className="flex items-center">
          <p className="text-2xl font-bold font-heading text-center relative z-50 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text py-1">
            Spend wisely, live well
          </p>
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {/* <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px] ">
            <Doughnut data={chartData} />
          </div> */}

          <TransactionForm />
        </div>
        {/* <Cards /> */}
      </div>
    </>
  );
};
export default Home;
