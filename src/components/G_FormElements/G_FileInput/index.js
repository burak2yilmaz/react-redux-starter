import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  STYLE
import "./style.scss";

export const G_FileInput = props => {
    const [ fileData, setFileData ] = useState([]);
    const [ error, setError ] = useState(false);
    const maxLeng = props.maxFileLength || 1;

    useEffect(() => {
        if (props.changeHandle)
            props.changeHandle(fileData);
    }, [ fileData ]);

    useEffect(() => {
        let timer = false;
        if (error)
        {
            timer = setTimeout(() => {
                setError(false);
            }, 3000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [ error ]);

    const fileControlHandle = files => {
        if (!props.disabled)
        {
            let data = [
                    ...fileData
                ],
                errCount = 0,
                successCount = 0;

            if (maxLeng < data || (maxLeng - data) < files.length)
                setError("Maksimum " + maxLeng + " adet dosya yükleyebilirsiniz.");
            else {
                if (files.length > 0)
                {
                    Object.keys(files).map(key => {
                        if (maxLeng > data.length)
                        {
                            const item = files[key];
                            let control = true;

                            if (props.correctTypes && props.correctTypes.indexOf(item.type) < 0)
                                control = false;

                            if (props.maxSizeLimit && props.maxSizeLimit < item.size)
                                control = false;

                            data.map(item2 => {
                                if (item2.name === item.name)
                                    control = false;
                            });

                            if (control)
                            {
                                data.push(item);
                                successCount++;
                            }
                            else
                                errCount++;
                        }
                        else
                            setError("Maksimum " + maxLeng + " adet dosya yükleyebilirsiniz.");
                    });

                    setFileData(data);

                    if (successCount > 0 || errCount > 0)
                    {
                        let text = "";
                        if (successCount > 0)
                            text += "Toplam " + successCount + " adet dosya kabul edildi. ";

                        if (errCount > 0)
                            text += errCount + " adet dosya uygun değil.";

                        setError(text);
                    }
                }
            }
        }
    };


    const changeHandle = e => {
        fileControlHandle(e.currentTarget.files);
        e.currentTarget.value = "";
    };

    const deleteItem = key => {
        let data = fileData.filter((item, itemKey) => {
            if (itemKey !== key)
                return item;
        })

        setFileData(data);
    }

    const dragDropReset = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    const dropHandle = e => {
        if (!props.disabled)
        {
            dragDropReset(e);
            dragLeaveHandle(e);

            if (e.dataTransfer.files.length > 1 && !props.multiple)
                setError("1 adet dosya yükleyebilirsiniz.");
            else
                fileControlHandle(e.dataTransfer.files);
        }
    }

    const dragEnterHandle = e => {
        if (!props.disabled)
            e.currentTarget.classList.add('active');
    };

    const dragLeaveHandle = e => {
        if (!props.disabled)
            e.currentTarget.classList.remove('active');
    };

    return (
        <div
            className={
                ClassNames(
                    "g-file-input",
                    {
                        disabled: props.disabled
                    }
                )
            }
        >
            <label>
                <div className="g-file-input-inner">
                    <div
                        className="g-file-input-drag-catcher"
                        onDragEnter={dragEnterHandle}
                        onDragLeave={dragLeaveHandle}
                        onDrop={dropHandle}
                        onDragEnd={dragDropReset}
                        onDragOver={dragDropReset}
                    />
                    <div className="g-file-input-inner-content">
                        <i className="icon icon-download g-file-input-icon"/>
                        <span className="g-file-input-text">{ props.text || "Dosya yüklemek için tıklayın veya sürükle-bırak metodunu kullanın." }</span>
                        {
                            (props.correctTypes || props.maxSizeLimit) &&
                            <>
                            <span className="g-file-input-information">
                                {((props.maxFileLength) && "Toplam " + props.maxFileLength + " adet dosya yükleyebilirsiniz. ")}
                                {((props.maxSizeLimit) && "Maksimum dosya boyutu " + (props.maxSizeLimit / 1000000) + "MB olmalıdır. ")}
                                { ((props.correctTypes) && "Aşağıda ki dosya türlerinde yükleme yapabilirsiniz.") }
                            </span>
                                {
                                    props.correctTypes &&
                                    <div className="g-file-input-correct-file-list">
                                        <ul>
                                            {
                                                props.correctTypes.map((item, key) =>
                                                    <li key={key}>{ item }</li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                }
                            </>
                        }
                        {
                            error &&
                            <span className="g-file-input-error">{ error }</span>
                        }
                    </div>
                </div>
                <input
                    type="file"
                    className={"hideItem"}
                    name={ props.name || undefined }
                    onChange={changeHandle}
                    multiple={ props.multiple || false }
                    disabled={props.disabled}
                />
            </label>
            {
                (props.listView && fileData.length) > 0 &&
                <div className="g-file-input-file-list">
                    <div className="g-file-input-file-list-status">
                        <span
                            className={
                                ClassNames(
                                    "file-limit",
                                    {
                                        full: maxLeng === fileData.length
                                    }
                                )
                            }
                            style={{
                                width: (((85 / maxLeng) * fileData.length) + 15) + "%"
                            }}
                        >{ fileData.length }/<span>{ maxLeng }</span></span>
                    </div>
                    <div className="g-file-input-file-list-inner">
                        <ul>
                            {
                                fileData.map((item, key) =>
                                    <li key={key}>
                                        <span className="itemName">{ item.name }</span>
                                        <i
                                            className="icon icon-cancel"
                                            onClick={() => {
                                                deleteItem(key);
                                            }}
                                        />
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};
G_FileInput.propTypes = {
    text: PropTypes.string,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    multiple: PropTypes.bool,
    correctTypes: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string
        ])
    ),
    maxSizeLimit: PropTypes.number,
    maxFileLength: PropTypes.number,
    changeHandle: PropTypes.func,
    disabled: PropTypes.bool,
    listView: PropTypes.bool
};