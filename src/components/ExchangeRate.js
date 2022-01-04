import React, { Component } from "react";
import Select from 'react-select'

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
        return <div>
            <h1 className="title">
                Summary of <b>Mexican Peso</b> exchange rates against other currencies.
            </h1>
            <label htmlFor="sourceCurrency">Compare</label>
            <Select options={this.options} />
            {/* <select id="sourceCurrency" name="sourceCurrency">
                <option value="MXN">Peso Mexicano - MXN</option>
            </select> */}
            <label htmlFor="destinationCurrency">to</label>
            <Select options={this.options} />
            {/* <select id="sourceCurrency" name="sourceCurrency">
                <option value="USD">United States Dollar - USD</option>
            </select> */}
        </div>;
    }

}

export default EchangeRate;