import React, {useEffect} from 'react';

function Journal(props) {
    const {selectTab} = props;

    const selectTheTab = () => {
        selectTab("Journal");
    }

    useEffect(selectTheTab, [selectTab]);

    return (
        <div>
            Journal Page
        </div>
    );
}

export default Journal