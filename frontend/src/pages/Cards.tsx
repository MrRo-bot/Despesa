import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import Card from "../components/Card";

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);
  const { data: authData } = useQuery(GET_AUTHENTICATED_USER);

  return (
    <div className="w-full px-10">
      <p className="text-3xl font-bold text-center my-10">
        {data?.transactions?.length === 0
          ? "No transactions found"
          : "Transaction History"}
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data?.transactions?.length > 0 &&
          data?.transactions?.map(
            (transaction: {
              _id: string;
              description: string;
              paymentType: string;
              category: string;
              amount: number;
              location: string;
              date: string;
            }) => (
              <Card
                key={transaction._id}
                transactionData={transaction}
                profilePicture={authData?.authUser?.profilePicture}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Cards;
