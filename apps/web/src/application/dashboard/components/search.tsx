"use client";

import { Input } from "@src/components/ui/input";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();

  const onChange = (event) => {
    router.push(`/?search=${event.target.value}`);
  };

  return (
    <Input
      placeholder="Search project..."
      className="max-w-[300px]"
      onChange={onChange}
    />
  );
};

export default Search;
