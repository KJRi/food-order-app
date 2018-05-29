// @flow
import React from 'react'
import styles from './GoodsList.css'
import { List, Avatar, Icon, Rate } from 'antd'
import { Link } from 'react-router-dom'

type Props = {
  goodsList: props
}
type State = {}

class GoodsList extends React.PureComponent<Props, State> {
  render () {
    const { goodsList } = this.props
    console.log(goodsList)
    console.log(goodsList)
    goodsList && goodsList.map(item => {
      item.href = `/good/${item.id}`
    })
    return (
      <List
        itemLayout='horizontal'
        dataSource={goodsList}
        renderItem={item => {
          let url = `http://fuss10.elemecdn.com/${item.image_path}.jpeg`
          return (
            <Link to={item.href}>
              <List.Item key={item.name}>
                <List.Item.Meta
                  avatar={<Avatar shape='square' src={url} />}
                  title={item.name}
                  description={<div>
                    <p><Rate disabled defaultValue={item.rating} /> {item.rating} 月售{item.recent_order_num}</p>
                    <p>起送 ￥{item.piecewise_agent_fee.rules[0].price} | {item.piecewise_agent_fee.description}</p>
                  </div>}
        />
                <div>
                  <p>{item.order_lead_time}分钟 | {item.distance}米</p>
                </div>
              </List.Item>
            </Link>
          )
        }}
  />
    )
  }
}

// const ReactTemplate = (props: Props) => {
//   return (
//     <div>hello world</div>
//   )
// }

export default GoodsList
