import React from 'react';

//  STYLE
import "./style.scss";

//  ASSETS
import FormSuccessIMG from '../../../public/images/form-success.svg';

const FormSuccessInfo = (props) => {
    return (
        <div className="formSuccessInfo">
            <div className="successBox">
                <div className="successBoxInner">
                    <img src={FormSuccessIMG} alt="Jumbo Künefe"/>
                    <div className="successBoxText">
                        <span>Form başarıyla gönderildi. Bildiriminiz için teşekkür ederiz.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FormSuccessInfo };
