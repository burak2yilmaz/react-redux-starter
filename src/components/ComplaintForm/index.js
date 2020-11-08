import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

//  COMPONENTS
import {
    G_TextArea,
    G_TextBox,
    G_SelectBox,
    FormSuccessInfo
} from '../';

//  HELPERS
import {
    Validator
} from "../../helpers";

//  CONTROLLERS
import {
    FormsController
} from "../../controllers";

//  STYLE
import "./style.scss";

const ComplaintForm = (props) => {
    const [ formErrors, setFormErrors ] = useState({
        type: false,
        message: false
    });
    const [ loading, setLoading ] = useState(false);
    const [ successForm, setSuccessForm ] = useState(false);
    const [ form, setForm ] = useState({
        customer: {
            fullname: false,
            phone: false,
            mail: false,
        },
        branch: false,
        message: false,
        type: 2
    });

    let branchesTypes = [];
    props.branches.map(item => {
        branchesTypes.push(item._id);
    })

    const confirmHandle = () => {
        setLoading(true);
        Validator.validate(form, {
            customer: Validator.shape({
                fullname: Validator.string.required.end,
                phone: Validator.number.required.end,
                mail: Validator.string.end,
            }).required.end,
            branch: Validator.oneOf(branchesTypes).required.end,
            message: Validator.string.required.end,
            type: Validator.oneOf([2]).required.end
        }, {
            replaceKeys: {
                fullname: "Ad-Soyad",
                phone: "Telefon Numarası",
                mail: "Mail Adresi",
                branch: "Şube",
                message: "Mesaj",
                type: "Form Tipi"
            }
        })
            .then(() => {
                FormsController.complaintForm(form)
                    .then(() => {
                        setFormErrors({
                            message: "İşlem başarıyla gerçekleşti."
                        });
                        setSuccessForm(true);
                    })
                    .catch(err => {
                        setFormErrors({
                            type: "error",
                            message: err.message
                        });
                        setTimeout(() => {
                            setFormErrors({
                                type: false,
                                message: false
                            });
                            setLoading(false);
                        }, 3000);
                    })
            })
            .catch(err => {
                setFormErrors({
                    type: "error",
                    message: err.message
                });
                setTimeout(() => {
                    setFormErrors({
                        type: false,
                        message: false
                    });
                    setLoading(false);
                }, 3000);
            })
    };

    return (
        <div id="complaintForm">
            <div className="form">
                {
                    successForm &&
                    <FormSuccessInfo/>
                }
                <div className="formBlock">
                    <div className="inputRow">
                        <label>
                            <span className="head">Ad-Soyad *</span>
                            <G_TextBox
                                value={form.customer.fullname}
                                changeHandle={fullname => {
                                    setForm({
                                        ...form,
                                        customer: {
                                            ...form.customer,
                                            fullname
                                        }
                                    })
                                }}
                            />
                        </label>
                    </div>
                    <div className="inputRow">
                        <label>
                            <span className="head">Telefon Numarası *</span>
                            <G_TextBox
                                value={form.customer.phone}
                                changeHandle={phone => {
                                    setForm({
                                        ...form,
                                        customer: {
                                            ...form.customer,
                                            phone
                                        }
                                    })
                                }}
                                pattern={"^([0-9]*)$"}
                            />
                        </label>
                    </div>
                    <div className="inputRow">
                        <label>
                            <span className="head">Mail Adresi</span>
                            <G_TextBox
                                value={form.customer.mail}
                                changeHandle={mail => {
                                    setForm({
                                        ...form,
                                        customer: {
                                            ...form.customer,
                                            mail
                                        }
                                    })
                                }}
                            />
                        </label>
                    </div>
                    {
                        props.branches &&
                        <div className="inputRow">
                            <label>
                                <span className="head">Şube</span>
                                <G_SelectBox
                                    data={props.branches}
                                    changeHandle={branch => {
                                        setForm({
                                            ...form,
                                            branch
                                        })
                                    }}
                                    value={form.branch}
                                    valueChanger={{
                                        value: "_id",
                                        text: "name"
                                    }}
                                />
                            </label>
                        </div>
                    }
                    <div className="inputRow">
                        <label>
                            <span className="head">Mesajınız *</span>
                            <G_TextArea
                                value={form.message}
                                changeHandle={message => {
                                    setForm({
                                        ...form,
                                        message
                                    })
                                }}
                            />
                        </label>
                    </div>
                    <div className="inputRow buttons">
                        <div
                            className="button"
                            onClick={confirmHandle}
                        >
                            {
                                loading ? "Lütfen Bekleyin" : "Gönder"
                            }
                        </div>
                    </div>
                    {
                        formErrors.message &&
                        <div className="inputRow">
                            <div
                                className={
                                    ClassNames(
                                        "notification",
                                        {
                                            error: formErrors.type === "error",
                                        }
                                    )
                                }
                            >
                                { formErrors.message }
                            </div>
                        </div>
                    }
                    <div className="inputRow note">
                        <span>Bu form üzerinden ileteceğiniz bilgiler Jumbo Künefe ve şubeleri tarafından hizmet geliştirme amacıyla kullanılacaktır. Üçüncü şahıslarla paylaşılması söz konusu değildir. Jumbo Künefe iletişime geçme hakkını gizli tutar.</span>
                    </div>
                </div>
            </div>
            <div
                className="text"
            >
                <span
                    onClick={() => {
                        props.setForm(0);
                    }}
                >Geri Dön</span>
            </div>
        </div>
    );
};

ComplaintForm.propTypes = {
    branches: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired
};

export { ComplaintForm };
