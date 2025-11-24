import classnames from "classnames";
import {Bell} from "react-feather";
import {
    Badge, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown,
} from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";


const NotificationDropdown = ({
                                  notificationsList,
                                  fetchNextPage,
                                  hasNextPage,
                                  markReadNotificationMutateAsync,
                                  unReadNotificationsCount,
                              }) => {

    const navigate = useNavigate();
    const {makeLocaleUrl, translate} = useLocaleContext();

    const EndMessage = () => {
        return notificationsList.length > 0 ? (
            <p className="w-100 text-center">
                <b>{translate('notifications.common.notification-list-ended')}</b>
            </p>
        ) : (
            <p className="position-absolute bottom-0 translate-middle"
               style={{textAlign: "center", left: "50%"}}>
                <b>{translate('notifications.common.notification-list-ended')}</b>
            </p>
        )
    };


    const renderNotificationItems = () => {
        return (<div id="scrollableDiv" style={{height: 150, overflow: "auto"}}>
            <InfiniteScroll
                key={notificationsList}
                dataLength={notificationsList?.length || 0}
                next={() => {
                    fetchNextPage()
                }}
                hasMore={hasNextPage}
                loader={<CircularProgress color="inherit" size={30}/>}
                endMessage={<EndMessage />}
                scrollableTarget="scrollableDiv"
            >
                {notificationsList?.map((item, index) => {
                    return (<a
                        key={index}
                        className="d-flex"
                        onClick={async () => {
                            await markReadNotificationMutateAsync(item.id);
                            navigate(makeLocaleUrl(`sale-orders/view/${item.notification.metaData.entityId}`));
                        }}
                    >
                        <div
                            className={classnames("list-item d-flex flex-column border-bottom-light p-1 w-100", {
                                'bg-primary bg-opacity-75 text-white': !item.read,
                            })}
                        >
                            <span className="mx-1">
                                {item.notification.title} - {translate('notifications.common.order')}: {item.id}
                            </span>
                            <span className="mx-1">
                                {item.notification.body}
                            </span>

                        </div>

                    </a>)
                })}
            </InfiniteScroll>
        </div>);
    };

    return (
        <UncontrolledDropdown
            tag="li"
            className="dropdown-notification nav-item me-25"
        >
            <DropdownToggle
                tag="a"
                className="nav-link"
                href="/"
                onClick={(e) => {
                    e.preventDefault()
                }}
            >
                <Bell size={21}/>

                {/*red Badge*/}
                {unReadNotificationsCount > 0 &&
                    <Badge pill color="danger" className="badge-up"
                           style={{
                               minHeight: '12px', minWidth: '12px', top: '-4px', right: '6px',
                           }}
                    ></Badge>
                }

            </DropdownToggle>
            <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
                <li className="dropdown-menu-header">
                    <DropdownItem className="d-flex" tag="div" header>
                        <h4 className="notification-title mb-0 me-auto">{translate('common.notifications')}</h4>
                        <Badge tag="div" color="light-primary" pill key={notificationsList}>
                            {notificationsList.length}
                        </Badge>
                    </DropdownItem>
                </li>
                {renderNotificationItems()}

            </DropdownMenu>
        </UncontrolledDropdown>);
};

export default NotificationDropdown;
