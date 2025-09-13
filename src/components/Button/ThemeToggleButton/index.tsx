import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../../../store/themeSlice";
import type { RootState } from "../../../store";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <button onClick={() => dispatch(toggleMode())}>
      Switch to {mode === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggleButton;
