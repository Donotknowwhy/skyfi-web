import { useContext } from "react";
import { ActivateContext } from "../providers/providerActivate";



const useActivateVikki = () => {
  const context = useContext(ActivateContext);
	return context;
}
export default useActivateVikki;