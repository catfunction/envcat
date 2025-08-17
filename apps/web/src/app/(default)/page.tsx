import Dashboard from "@src/application/dashboard/components/dashboard";

const HomePage = async (
  props: {
    searchParams: Promise<{ search: string }>;
  }
) => {
  const searchParams = await props.searchParams;
  return <Dashboard search={searchParams.search} />;
};

export default HomePage;
