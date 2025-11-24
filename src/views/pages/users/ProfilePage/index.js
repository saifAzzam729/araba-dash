// ** React Imports
import React, {useState} from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** User View Components
import UserTabs from "./partials/Tabs";
import UserInfoCard from "./partials/UserInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import UsersService from "@src/common/services/UsersService";
import { useQuery } from "react-query";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const UserView = () => {

	// ** Hooks
	const { id } = useParams();


	const [active, setActive] = useState("1");
	const [user, setUser] = useState(null);
	const {preferredTableContentLocale} = useSettingsUiContext();

	useQuery(
		['user', id],
		() => UsersService.getById(id, {locale: preferredTableContentLocale}),
        {
            onSuccess: (res) => {
                setUser(res.data);
            }
        }
	)

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
					<UserInfoCard user={user} />
				</Col>
				<Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
					<UserTabs active={active} toggleTab={toggleTab}  user={user}/>
				</Col>
			</Row>
		</div>
	);
};
export default UserView;
