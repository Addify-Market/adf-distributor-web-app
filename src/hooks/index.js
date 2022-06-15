import { useDispatch } from "react-redux";

export default function useHook() {
  // const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const toggleUser = (status, role) => {
    dispatch({ type: "SET_ROLE", payload: role });
    dispatch({ type: "SET_USER", payload: status });
  };
  return {
    toggleUser
  };
}
