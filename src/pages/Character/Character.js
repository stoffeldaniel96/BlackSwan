import React, {useEffect} from 'react';

function Character(props) {
    const {selectTab} = props;

    const selectTheTab = () => {
        selectTab("Character");
    }

    useEffect(selectTheTab, [selectTab]);

    return (
        <div> Character Page </div>
    );
}

export default Character