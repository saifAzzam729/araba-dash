// ** React Imports
import React, {useState} from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** User View Components
import AdminTabs from "./partials/Tabs";
import AdminInfoCard from "./partials/AdminInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import {useAuth} from "@src/utility/context/AuthProvider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const UserView = () => {

	// ** Hooks

	const [active, setActive] = useState("1");
	const {user} = useAuth()

	const toggleTab = (tab) => {
		if (active !== tab) {
			setActive(tab);
		}
	};

	if (!user) {
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
					<AdminInfoCard user={user} />
				</Col>
				<Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
					<AdminTabs active={active} toggleTab={toggleTab}  user={user}/>
				</Col>
			</Row>
		</div>
	);
};
export default UserView;
