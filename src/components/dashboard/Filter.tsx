"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/useDebounce";

interface FilterProps {
  onChange: (query: string) => void;
}
const Filter: React.FC<FilterProps> = ({ onChange }: FilterProps) => {
  const [query, setQuery] = useState<string>("");
  const debounceSearch = useDebounce(query, 300);

  useEffect(() => {
    onChange(debounceSearch);
  }, [debounceSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setQuery(val);
  };
  return (
    <div>
      <Input onChange={handleChange} value={query} placeholder="Filter" />
    </div>
  );
};

export default Filter;
