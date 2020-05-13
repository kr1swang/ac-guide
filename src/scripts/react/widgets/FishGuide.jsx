import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeBar from './TimeBar.jsx'

export default class FishGuide extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.dataList.length == 0 ? <h4>Loding...</h4> :
                    <table>
                        <thead>
                            <tr>
                                {/* <th>項次</th> */}
                                <th>名稱</th>
                                <th>價格</th>
                                <th>地點</th>
                                <th>魚影</th>
                                <th>{this.props.hemisphere == 'northern' ? '北半球月份' : '南半球月份'}</th>
                                <th>出現時間</th>
                                <th>備註</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.dataList.map((item, index) =>
                                <tr key={index}>
                                    {/* <td>{index + 1 + '.'}</td> */}
                                    <td>
                                        <img style={{ margin: '0 20px', maxWidth: '50px' }} src={item.imageURL} />
                                        <h5 style={{ margin: '0px', textAlign: 'center' }}>{item.chineseName}</h5>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>{item.price}</td>
                                    <td>{item.location}</td>
                                    <td>{item.shadowSize}</td>
                                    <td><TimeBar type={'month'} data={this.props.hemisphere == 'northern' ? item.northernMonths : item.southernMonths} /></td>
                                    <td><TimeBar type={'hour'} data={item.appearanceTime} /></td>
                                    <td>{item.remark}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

FishGuide.defaultProps = {
    dataList: [],
    hemisphere: 'northern'
}

FishGuide.propTypes = {
    dataList: PropTypes.array,
    hemisphere: PropTypes.string
}