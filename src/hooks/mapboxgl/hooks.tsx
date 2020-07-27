import { useState, useCallback } from "react";
import { mapboxToken } from "../../config";

export const useSearchMapbox = (): [
  (searchQuery: string, prox: any) => any,
  any,
  boolean,
  string
] => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState(null);

  const searchMaps = useCallback(async (searchQuery: string, prox) => {
    setLoading(true);
    let uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapboxToken}&cachebuster=1595684583559&autocomplete=true&country=au`;
    if (prox && prox.lat && prox.lng) {
      uri += `&proximity=${prox.lng},${prox.lat}`;
    }
    const response = await fetch(encodeURI(uri));

    if (!response.ok) setError(response.statusText);
    const finalData = await response.json();
    setData(finalData);
    setLoading(false);
    return finalData;
  }, []);
  return [searchMaps, data, loading, error];
};
