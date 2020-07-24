import { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { parse, stringify, ParsedQuery } from "query-string";

/**
 * This hook parses the current route's search value
 * and returns it as an object to use as state.
 *
 * It also provides a function that can be used to update
 * the URL's search value. Provide the `key` and the
 * corresponding `value` to set it to. If no `value` is
 * given, the parameter is removed from the search.
 *
 * @returns [search, setSearch]
 */
export const useRouteSearchState = (): [
  ParsedQuery<string>,
  (key: string, value?: string) => void
] => {
  const { push } = useHistory();
  const searchState = parse(useLocation().search);

  const setSearchState = useCallback(
    (key: string, value?: string) => {
      // If there is a value, update it
      if (value) {
        push({
          search: stringify({ ...searchState, [key]: value }),
        });
      } else {
        // If there isn't a value, remove it
        delete searchState[key];
        push({
          search: stringify(searchState),
        });
      }
    },
    [push, searchState]
  );

  return [searchState, setSearchState];
};
