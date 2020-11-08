import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  STYLE
import "./style.scss";

export const G_PaginationButtons = props => {
    const leftMaxPageCount = props.leftMaxPageCount || 1,
        rightMaxPageCount = props.rightMaxPageCount || 1;

    const createButtons = () => {
        let buttons = [];

        for (let i = (props.currentPage - leftMaxPageCount); i <= (props.currentPage + rightMaxPageCount); i++)
        {
            if (i > 0 && i <= props.totalPage)
            {
                buttons.push(
                    <div
                        className={
                            ClassNames(
                                "g-pagination-button",
                                {
                                    current: i === props.currentPage
                                }
                            )
                        }
                        key={i}
                        onClick={() => {
                            if (i !== props.currentPage)
                                changePage(i);
                        }}
                    >
                        <span>{ i }</span>
                    </div>
                );
            }
        }

        return buttons;
    };

    const changePage = page => {
        props.changeHandle(page);
    };

    const nextPage = () => {
        changePage(props.currentPage + 1);
    };

    const prevPage = () => {
        changePage(props.currentPage - 1);
    };

    return (
        <div className="g-pagination-buttons">
            {
                props.currentPage > 1 &&
                <div
                    className="g-pagination-button"
                    onClick={prevPage}
                >
                    <span>
                        <i className="icon icon-angle-left"/>
                    </span>
                </div>
            }
            {
                createButtons()
            }
            {
                props.currentPage < props.totalPage &&
                <div
                    className="g-pagination-button"
                    onClick={nextPage}
                >
                    <span>
                        <i className="icon icon-angle-right"/>
                    </span>
                </div>
            }
        </div>
    );
};
G_PaginationButtons.propTypes = {
    totalPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    changeHandle: PropTypes.func.isRequired,
    leftMaxPageCount: PropTypes.number,
    rightMaxPageCount: PropTypes.number,
}