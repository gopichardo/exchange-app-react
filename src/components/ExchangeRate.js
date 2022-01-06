import React, { Component } from "react";
import Select from 'react-select';
import "../assets/css/ExchangeRate.css";

class EchangeRate extends Component {

    constructor(props) {
        super(props);
        this.options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ];
    }


    render() {
        return <div className="column">
            <h1 className="title is-size-4-mobile">
                Summary of <b>Mexican Peso</b> exchange rates against other currencies.
            </h1>
            <div className="has-text-centered pb-3">
                <label htmlFor="sourceCurrency" className="is-size-5-mobile">Compare</label>
            </div>
            <Select options={this.options} className="pb-3" />
            <div className="has-text-centered pb-3">
                <label htmlFor="destinationCurrency" className="is-size-5-mobile">to</label>
            </div>
            <Select options={this.options} className="pb-3" />
            <div className="column big-card">
                X
            </div>
        </div>;
    }

}

export default EchangeRate;