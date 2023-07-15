import Dashboard from "@src/application/dashboard/components/dashboard";

const HomePage = async ({
  searchParams,
}: {
  searchParams: { search: string };
}) => {
  return <Dashboard search={searchParams.search} />;
};

export default HomePage;
