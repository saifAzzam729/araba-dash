// ** React Imports
import React, {useState} from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Vendor View Components
import VendorTabs from "./partials/Tabs";
import VendorInfoCard from "./partials/VendorInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import VendorsService from "@src/common/services/VendorsService";
import { useQuery } from "react-query";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const VendorView = () => {

	// ** Hooks
	const { id } = useParams();

	const [active, setActive] = useState("1");
	const [vendor, setVendor] = useState(null);
	const {preferredTableContentLocale} = useSettingsUiContext();

	useQuery(
		['vendor', id],
		() => VendorsService.getById(id, {locale: preferredTableContentLocale}),
        {
            onSuccess: (res) => {
                setVendor(res.data);
            }
        }
	)

	const toggleTab = (tab) => {
		if (active !== tab) {
			setActive(tab);
		}
	};

	if (!vendor) {
		return (
			<Stack className="d-flex align-items-center justify-content-center mt-5"
				   sx={{color: 'grey.500', margin: 'auto'}} direction="row">
				<CircularProgress color="inherit"/>
			</Stack>
		)
	}

	return (
		<div className="app-user-view">
			<Row>
				<Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
					<VendorInfoCard vendor={vendor} />
				</Col>
				<Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
					<VendorTabs active={active} toggleTab={toggleTab} vendor={vendor}/>
				</Col>
			</Row>
		</div>
	);
};
export default VendorView;

