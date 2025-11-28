import Avatar from "@components/avatar";
import parseImageUrl from "@src/common/helpers/ParseImageUrl";

const VendorLogo = ({vendor}) => {
    const logoUrl = vendor?.vendor?.storeLogoUrl || vendor?.vendorDetails?.storeLogo;
    
    if (logoUrl) {
        return (
            <img
                height="110"
                width="110"
                alt="vendor-logo"
                src={parseImageUrl(logoUrl)}
                className="img-fluid rounded mt-3 mb-2"
            />
        );
    } else {
        const storeName = vendor?.vendor?.storeName || vendor?.vendorDetails?.storeName || vendor?.fullName || "Vendor";
        return (
            <Avatar
                initials
                color={"light-primary"}
                className="rounded mt-3 mb-2"
                content={storeName}
                contentStyles={{
                    borderRadius: 0,
                    fontSize: "calc(48px)",
                    width: "100%",
                    height: "100%",
                }}
                style={{
                    height: "110px",
                    width: "110px",
                }}
            />
        );
    }
}
export default VendorLogo;

