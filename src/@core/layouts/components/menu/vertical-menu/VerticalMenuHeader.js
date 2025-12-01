// ** React Imports
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

// ** Icons Imports
import { Disc, X, Circle } from "react-feather";

// ** Config
import themeConfig from "@configs/themeConfig";

// ** Utils
import { DefaultRoute } from "@src/router/routes";
import { useAuth } from "@src/utility/context/AuthProvider";
import defaultAvatar from "@src/assets/images/logo/default-avatar.jpg";
import Avatar from "@mui/material/Avatar";
import { Button } from "reactstrap";
import { useLocaleContext } from "@src/providers/LocaleProvider";
import { useGlobalContext } from "@src/providers/GlobalProvider";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";

const VerticalMenuHeader = (props) => {
	const { storeName, storeLogo } = useGlobalContext();

	// ** Props
	const {
		menuCollapsed,
		setMenuCollapsed,
		setMenuVisibility,
		setGroupOpen,
		menuHover,
	} = props;

	// ** Vars
	const { isVendor } = useAuth();
	const { translate } = useLocaleContext();

	// ** Reset open group
	useEffect(() => {
		if (!menuHover && menuCollapsed) setGroupOpen([]);
	}, [menuHover, menuCollapsed]);

	// ** Menu toggler component
	const Toggler = () => {
		if (!menuCollapsed) {
			return (
				<Disc
					size={20}
					data-tour="toggle-icon"
					className="toggle-icon d-none d-xl-block text-white"
					onClick={() => setMenuCollapsed(true)}
				/>
			);
		} else {
			return (
				<Circle
					size={20}
					data-tour="toggle-icon"
					className="toggle-icon d-none d-xl-block"
					onClick={() => setMenuCollapsed(false)}
				/>
			);
		}
	};

	return (
		<div className="navbar-header h-auto">
			<ul className="nav navbar-nav flex-row align-items-center">
				<li className="nav-item me-auto mb-1">
					{isVendor ? (
						<NavLink to={DefaultRoute} className="navbar-brand mt-1 ms-2">
							<div className="d-flex align-items-center gap-2">
								<Avatar
									src={
										storeLogo ? ParseImageUrl(storeLogo.imageFileUrl) : defaultAvatar
									}
									sx={{ width: 40, height: 40 }}
									className={"store-avatar-wrapper bg-white"}
								/>
								<div className="d-flex flex-column" style={{ gap: "5px" }}>
									<span className="user-name fw-bold text-white fs-4">
										{storeName ? storeName.value : "Araba"}
									</span>
									<Button.Ripple className="round" outline size="sm">
										<Link to="https://google.com" target="_blank" className={"text-white"}>
											{translate(`sidebar.visit-store`)}
										</Link>
									</Button.Ripple>
								</div>
							</div>
						</NavLink>
					) : (
						<NavLink to={DefaultRoute} className="navbar-brand mt-1 ms-2">
							<div className="d-flex align-items-center gap-2">
								<div className="brand-Logo">
									<img src={themeConfig.app.appLogoImage} alt="logo" width={35} />
								</div>
								<span className="text-white fw-bold fs-4">Araba</span>
							</div>
						</NavLink>
					)}
				</li>
				<li className="nav-item nav-toggle">
					<div className="nav-link modern-nav-toggle cursor-pointer mx-1">
						<Toggler />
						<X
							onClick={() => setMenuVisibility(false)}
							className="toggle-icon icon-x d-block d-xl-none"
							size={20}
						/>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default VerticalMenuHeader;
