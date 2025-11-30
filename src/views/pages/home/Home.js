import {Fragment} from "react";
import {useAuth} from "@src/utility/context/AuthProvider";
import AdminContent from "@src/views/pages/home/admin-content/AdminContent";
import VendorContent from "@src/views/pages/home/vendor-content/VendorContent";

const Home = () => {
    const {user, isVendor} = useAuth();

    if (isVendor || user?.type === "VENDOR") {
        return <VendorContent />;
    }

    return <AdminContent />;
};

export default Home;
