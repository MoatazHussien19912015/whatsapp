import React from 'react';
import {Circle} from 'better-react-spinkit';
const Loading = () => {
    return (
        <center>
            <div>
                <img src="https://logo-logos.com/wp-content/uploads/2016/10/WhatsApp_logo_icon.png" alt=""
                height="200px" style={{marginBottom: '10px'}}/>
            </div>
            <Circle color="green" size={60} />
        </center>
    )
}

export default Loading;
