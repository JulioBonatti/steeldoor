import './styles.css'
import React from 'react';

type BelowNavDividerProps = {
    style?: React.CSSProperties
}
export default function BelowNavDivider(props: BelowNavDividerProps) {
    return (
        <div className="below-nav-divider" style={props.style}>
            <h3 style={{marginTop: '5px'}} className="h3-divider">Jobs List:</h3>
        </div>
    )
}
