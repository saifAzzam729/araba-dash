// ** Illustrations Imports
import errorImage from "@src/assets/images/pages/error.svg";

// ** Styles
import "@styles/base/pages/page-misc.scss";

const ErrorBoundaryPage = () => {
  return (
    <div className="w-100 text-center h-100 d-flex justify-content-center align-items-center flex-column">
        <img src={errorImage} alt="Not authorized page" height={'60%'}/>
        <br/>
        <h2 className="mb-1">Something Went Wrong</h2>
        <p className="mb-2">
            please contact the support team.
        </p>
    </div>
  );
};
export default ErrorBoundaryPage;
