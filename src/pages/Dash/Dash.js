import React, {useEffect} from 'react';

function Dash(props) {
    const {selectTab} = props;

    const selectTheTab = () => {
        selectTab("Dashboard");
    }

    useEffect(selectTheTab, [selectTab]);

    return (
        <div>
            Dashboard
        </div>
    );
}

export default Dash