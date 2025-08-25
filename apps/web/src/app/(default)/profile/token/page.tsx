import { cookies } from "next/headers";

import TokenClient from "@src/components/profile/TokenClient";

const TokenPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("ENVCAT_TOKEN").value;

  return <TokenClient token={token} />;
};

export default TokenPage;
