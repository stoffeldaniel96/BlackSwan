import React, {useEffect} from 'react';

function Inventory(props) {
    const {selectTab} = props;

    const selectTheTab = () => {
        selectTab("Inventory");
    }

    useEffect(selectTheTab, [selectTab]);

    return (
        <div>
            Inventory
        </div>
    );
}

export default Inventory