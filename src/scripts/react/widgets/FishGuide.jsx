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
                                <th style={{ width: '10%' }}>名稱</th>
                                <th style={{ width: '16%' }}>價格</th>
                                <th style={{ width: '12%' }}>地點</th>
                                <th style={{ width: '12%' }}>魚影</th>
                                <th style={{ width: '25%' }}>{this.props.hemisphere == 'northern' ? '北半球月份' : '南半球月份'}</th>
                                <th style={{ width: '25%' }}>出現時間</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.dataList.map((item, index) =>
                                <tr key={index}>
                                    <td>
                                        <img style={{ maxWidth: '50px' }} src={item.imageURL} /><br />
                                        <small>{item.chineseName}</small>
                                    </td>
                                    <td>{item.price}</td>
                                    <td>
                                        {item.location}
                                        {item.remark != '' ? <small><br />{'※' + item.remark}</small> : ''}
                                    </td>
                                    <td>{item.shadowSize}</td>
                                    <td>
                                        <TimeBar type={'month'} data={this.props.hemisphere == 'northern' ? item.northernMonths : item.southernMonths} />
                                    </td>
                                    <td>
                                        <TimeBar type={'hour'} data={item.appearanceTime} />
                                    </td>
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