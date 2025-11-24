// ** React Imports
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Button } from "reactstrap";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/error.svg";
import illustrationsDark from "@src/assets/images/pages/error-dark.svg";

// ** Styles
import "@styles/base/pages/page-misc.scss";

const SomethingWentWrong = () => {
  // ** Hooks
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  return (
      <div className="pt-3 w-100 text-center">
        <h2 className="mb-1">Something Went Wrong</h2>
        <p className="mb-2">
          something went wrong, please contact the suppoort team.
        </p>
        <Button
          tag={Link}
          to="/"
          color="primary"
          className="btn-sm-block mb-2"
        >
          Back to home
        </Button>
        <br/>
        <img src={source} alt="Not authorized page" height={'300px'}/>
      </div>
  );
};
export default SomethingWentWrong;
