import { useApplyFilter } from "@/contexts";
import { FC } from "react";
import SearchBox from "../Filters/SearchBox";

type Props = {
  terms: string[];
};

export const TitleSearch: FC<Props> = ({ terms }) => {
  const applyFilter = useApplyFilter();

  const onSearchBoxQueryChange = (query: string) =>
    applyFilter({ titleQuery: query });

  return <SearchBox onSearch={onSearchBoxQueryChange} terms={terms} />;
};
