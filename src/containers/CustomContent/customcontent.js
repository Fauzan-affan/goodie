import React, { Component } from "react";
import { Card, Carousel } from "antd";

class CustomContent extends Component {

    render() {
        const contentStyle = {
            height: '500px',
            color: '#fff',
            lineHeight: '500px',
            textAlign: 'center',
            background: '#364d79',
        };

        return (
            <Card>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </Card>
        )

    }
}

export default(CustomContent);