import PropTypes from "prop-types";
import React from "react";

function createNavMenuItems({routes, onClick, selectedTab, classes}) {
    let menuItems = [];

    routes.forEach(route => {
        const Icon = route.icon;
        menuItems.push(
            {
                link: route.path,
                name: route.name,
                onClick: onClick,
                icon: {
                    desktop: (
                        <Icon
                            className={
                                selectedTab === route.name ? classes.textPrimary : "text-white"
                            }
                            fontSize="small"
                        />
                    ),
                    mobile: <Icon className="text-white" />,
                }
        })
    })

    return menuItems;
}

createNavMenuItems.PropTypes = {
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.array.isRequired
}

export default createNavMenuItems;