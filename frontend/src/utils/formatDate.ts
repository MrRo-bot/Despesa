const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp)); // string integer representing milliseconds

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default formatDate;
