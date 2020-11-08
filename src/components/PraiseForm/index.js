import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

//  COMPONENTS
import {
    FormSuccessInfo,
    G_SelectBox,
    G_TextArea
} from "../";

//  HELPERS
import {
    Validator
} from "../../helpers";

//  STYLE
import "./style.scss";
import {FormsController} from "../../controllers";

const PraiseForm = (props) => {
    const [ formErrors, setFormErrors ] = useState({
        type: false,
        message: false
    })
    const [ loading, setLoading ] = useState(false);
    const [ successForm, setSuccessForm ] = useState(false);
    const [ form, setForm ] = useState({
        branch: false,
        formDetails: {
            point: false,
        },
        message: false,
        type: 1
    });

    let branchesTypes = [];
    props.branches.map(item => {
        branchesTypes.push(item._id);
    })

    const confirmHandle = () => {
        setLoading(true);
        Validator.validate(form, {
            branch: Validator.oneOf(branchesTypes).required.end,
            message: Validator.string.required.end,
            formDetails: Validator.shape({
                point: Validator.number.required.end,
            }).required.end,
            type: Validator.oneOf([1]).required.end
        }, {
            replaceKeys: {
                point: "Puan",
                branch: "Şube",
                message: "Mesaj",
                type: "Form Tipi"
            }
        })
            .then(() => {
                FormsController.praiseForm(form)
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
        <div id="praiseForm">
            <div className="form">
                {
                    successForm &&
                    <FormSuccessInfo/>
                }
                <div className="formBlock">
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
                    <div className="inputRow stars">
                        <span className="head">Puan</span>
                        <div className="items">
                            <div
                                className="item"
                                onClick={() => {
                                    setForm({
                                        ...form,
                                        formDetails: {
                                            ...form.formDetails,
                                            point: 1
                                        }
                                    })
                                }}
                            >
                                <i
                                    className={
                                        ClassNames(
                                            "icon",
                                            {
                                                "icon-star-empty": form.formDetails.point < 1,
                                                "icon-star": form.formDetails.point >= 1
                                            }
                                        )
                                    }
                                />
                            </div>
                            <div
                                className="item"
                                onClick={() => {
                                    setForm({
                                        ...form,
                                        formDetails: {
                                            ...form.formDetails,
                                            point: 2
                                        }
                                    })
                                }}
                            >
                                <i
                                    className={
                                        ClassNames(
                                            "icon",
                                            {
                                                "icon-star-empty": form.formDetails.point < 2,
                                                "icon-star": form.formDetails.point >= 2
                                            }
                                        )
                                    }
                                />
                            </div>
                            <div
                                className="item"
                                onClick={() => {
                                    setForm({
                                        ...form,
                                        formDetails: {
                                            ...form.formDetails,
                                            point: 3
                                        }
                                    })
                                }}
                            >
                                <i
                                    className={
                                        ClassNames(
                                            "icon",
                                            {
                                                "icon-star-empty": form.formDetails.point < 3,
                                                "icon-star": form.formDetails.point >= 3
                                            }
                                        )
                                    }
                                />
                            </div>
                            <div
                                className="item"
                                onClick={() => {
                                    setForm({
                                        ...form,
                                        formDetails: {
                                            ...form.formDetails,
                                            point: 4
                                        }
                                    })
                                }}
                            >
                                <i
                                    className={
                                        ClassNames(
                                            "icon",
                                            {
                                                "icon-star-empty": form.formDetails.point < 4,
                                                "icon-star": form.formDetails.point >= 4
                                            }
                                        )
                                    }
                                />
                            </div>
                            <div
                                className="item"
                                onClick={() => {
                                    setForm({
                                        ...form,
                                        formDetails: {
                                            ...form.formDetails,
                                            point: 5
                                        }
                                    })
                                }}
                            >
                                <i
                                    className={
                                        ClassNames(
                                            "icon",
                                            {
                                                "icon-star-empty": form.formDetails.point < 5,
                                                "icon-star": form.formDetails.point >= 5
                                            }
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
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

PraiseForm.propTypes = {
    branches: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired
};

export { PraiseForm };
