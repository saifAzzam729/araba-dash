import Avatar from "@components/avatar";
import parseImageUrl from "@src/common/helpers/ParseImageUrl";

const ProfileImage = ({user}) => {
    if (user.avatarFileUrl) {
        return (
            <img
                height="110"
                width="110"
                alt="user-avatar"
                src={parseImageUrl(user.avatarFileUrl)}
                className="img-fluid rounded mt-3 mb-2"
            />
        );
    } else {
        return (
            <Avatar
                initials
                color={"light-primary"}
                className="rounded mt-3 mb-2"
                content={user.fullName}
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
export default ProfileImage;