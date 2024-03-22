import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="errorPage">
      <h2>Error! Page not found!</h2>
      <Link to={"/"}>Home</Link>
    </div>
  );
};
