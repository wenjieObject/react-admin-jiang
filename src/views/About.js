import React, { Component } from 'react';
import { Button } from 'antd';


class About extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                about<br/>
                <Button type="primary">Primary Button</Button>
            </div>
        );
    }
}

export default About;