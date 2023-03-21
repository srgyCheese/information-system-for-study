import { useQuery } from "react-query";
import api from "../services/api";

const useGeoList = () => useQuery('geo', () => api.getData(`/geo/all`))

export { useGeoList }