// ** Logo
import logo from "@src/assets/images/logo/wiggelzLogo.svg";
import themeConfig from "@configs/themeConfig";

const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner app-loader">
      {/* <img className="fallback-logo" src={logo} width='100px' height='100px' alt="logo" /> */}
      <div className="brand-logo">
					<h2 className="fw-bolder fs-1" style={{color: '#004956'}} >{themeConfig.app.appName}</h2>
			</div>
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export default SpinnerComponent;
