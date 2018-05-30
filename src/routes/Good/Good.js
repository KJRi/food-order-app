// @flow
import React from 'react'
import styles from './Good.css'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Avatar, Card, List, Icon, Rate, message, InputNumber } from 'antd'
const { Meta } = Card
const packAge = [
  {
    key: 1,
    name: '单人套餐',
    price: 18.8,
    count: 1,
    url:'http://static.5ikfc.com/img/mdl/menu/ver-136/chaozhitaocan-4104_07.jpg'
  },
  {
    key: 2,
    name: '双人套餐',
    price: 28.8,
    count: 1,
    url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=716011767,2723465044&fm=27&gp=0.jpg'
  },
  {
    key: 3,
    name: '豪华套餐',
    price: 38.8,
    count: 1,
    url:'http://static.5ikfc.com/img/mdl/menu/ver-136/chaozhitaocan-4104_21.jpg'
  }
]
type Props = {
  match: Object
}
type State = {
  good: Object,
  favState: Boolean,
  judgeList: Array<Object>
}

class Good extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      good: {},
      url: [],
      favState: false,
      judgeList: []
    }
  }
  componentDidMount () {
    const id = this.props.match.params.id
    const username = localStorage.getItem('username')
    fetch(`${__ELM_API__}shopping/restaurant/${id}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      good: res
    }))
    fetch(`/fav/getIs?goodId=${id}&&username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      if (res.length !== 0) {
        this.setState({ favState: true })
      }
    })
    fetch(`/judge/get?goodId=${id}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      judgeList: res
    })
    )
  }
  likeIt = () => {
    const { favState, good } = this.state
    if (favState) {
      // 取消收藏
      fetch('/fav/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          goodId: this.props.match.params.id
        })
      }).then(res => res.json())
        .then(res => {
          // 后端正确
          if (res.success) {
            message.destroy()
            message.success(res.message)
          } else {
            message.destroy()
            message.info(res.message)
          }
        })
        .catch(e => console.log('Oops, error', e))
      this.setState({
        favState: false
      })
    } else {
      // 收藏
      fetch('/fav/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          goodId: this.props.match.params.id,
          title: good.name,
          imageUrl: `http://fuss10.elemecdn.com/${good.image_path}.jpeg`,
          price: good.rating
        })
      }).then(res => res.json())
        .then(res => {
          // 后端正确
          if (res.success) {
            message.destroy()
            message.success(res.message)
          } else {
            message.destroy()
            message.info(res.message)
          }
        })
        .catch(e => console.log('Oops, error', e))
      this.setState({
        favState: true
      })
    }
  }
  carIt = (item: Object) => {
    console.log(item)
    // 添加购物车
    fetch('/car/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        goodId: this.props.match.params.id,
        title: this.state.good.name,
        price: item.price,
        imageUrl: `http://fuss10.elemecdn.com/${this.state.good.image_path}.jpeg`,
        count: item.count,
        name: item.name
      })
    }).then(res => res.json())
      .then(res => {
        // 后端正确
        if (res.success) {
          message.destroy()
          message.success(res.message)
        } else {
          message.destroy()
          message.info(res.message)
        }
      })
      .catch(e => console.log('Oops, error', e))
  }
  changeCount = (item: Object, e: Number) => {
    item.count = e
  }
  render () {
    const { good, favState, judgeList } = this.state
    console.log(judgeList)
    const url = `http://fuss10.elemecdn.com/${good.image_path}.jpeg`
    return (
      <div className={styles['containal']}>

        <Card
          actions={[<p onClick={this.likeIt}><Icon type={
            favState
            ? 'heart'
            : 'heart-o'
          } style={{ color: 'red' }} />{
            favState
            ? '取消收藏'
            : '收藏'
          }
          </p>]}
  >
          <Meta
            avatar={<Avatar src={url} />}
            style={{ fontSize: 14 }}
            title={good.name}
            description={good.address}
    />
          <div>
            <Rate disabled
              value={good.rating} />
            {good.rating} 月售
            {good.recent_order_num} | 商家配送约{good.order_lead_time}分钟
          </div>
          <div>{good.promotion_info}</div>
        </Card>
        <List
          itemLayout='horizontal'
          dataSource={packAge}
          renderItem={item => (
            <List.Item key={item.key}>
              <List.Item.Meta
                avatar={<Avatar src={item.url} />}
                title={item.name}
                description={<p>{item.price.toFixed(2)}</p>}
          />
              <div>
                <InputNumber min={1} onChange={(e) => this.changeCount(item, e)} defaultValue={1} />
                <p onClick={() => this.carIt(item)}><Icon type='shopping-cart' />添加购物车</p>
              </div>
            </List.Item>
      )}
    />
        <List
          itemLayout='horizontal'
          dataSource={judgeList}
          renderItem={item => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={item.username}
                title={<Rate disabled defaultValue={item.rate} />}
                description={<div><p>{item.goodName}</p><p>{item.content}</p></div>}
            />
            </List.Item>
        )}
      />
      </div>
    )
  }
}

// const ReactTemplate = (props: Props) => {
//   return (
//     <div>hello world</div>
//   )
// }

export default withRouter(Good)
