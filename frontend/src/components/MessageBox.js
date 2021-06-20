import React from 'react'


//props paramas to access the children of prop
//props.children special type of props show the content in the place it was used.
export default function MessageBox(props) {
    return (
        <div className={`alert alert-${props.varint || 'info'}`}>{props.children}</div>
    );
}
