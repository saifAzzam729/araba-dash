// ** React Imports
import {Outlet} from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import navigation from "@src/navigation/vertical";
import SettingsSidebar from "@src/views/SettingsSidebar";

const VerticalLayout = (props) => {

    return (
        <Layout menuData={navigation} {...props}>
            <Outlet/>
            <SettingsSidebar/>
        </Layout>
    );
};

export default VerticalLayout;
