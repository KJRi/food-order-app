// @flow
import React from 'react'
import styles from './Home.css'
import { Carousel, Icon } from 'antd'
import { Link } from 'react-router-dom'
import fetchJsonp from 'fetch-jsonp'
import GoodsList from 'components/GoodsList'

type Props = {}
type State = {
  goodsList: Array<Object>,
  address: String,
  banner: Array<Object>
}

class Home extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      goodsList: [],
      address: '',
      banner: []
    }
  }
  componentDidMount () {
    fetch(`${__ELM_API__}v2/pois/wqzbqbpz7srf`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      localStorage.setItem('latitude', res.latitude)
      localStorage.setItem('longitude', res.longitude)
      localStorage.setItem('geohash', res.geohash)
      this.setState({
        address: res.address
      })
    })
    const latitude = localStorage.getItem('latitude')
    const longitude = localStorage.getItem('longitude')
    fetch(`${__ELM_API__}shopping/v2/entries?latitude=${latitude}&&longitude=${longitude}&&templates[]=main_template`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      banner: res[0].entries
    }))
    fetch(`${__ELM_API__}shopping/restaurants?latitude=${latitude}&&longitude=${longitude}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      goodsList: res
    }))
  }
  clickMenu = (item: Object) => {
    const latitude = localStorage.getItem('latitude')
    const longitude = localStorage.getItem('longitude')
    fetch(`${__ELM_API__}shopping/restaurants?latitude=${latitude}&&longitude=${longitude}&&activity_id=${item.id}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      goodsList: res
    }))
  }
  render () {
    const { goodsList, address, banner } = this.state
    return (
      <div className={styles['containal']}>
        <p style={{ fontSize: 16, paddingTop: 10 }}>
          <Icon type='environment' style={{ color: '#0097FF' }} />
          {address}</p>
        <Carousel autoplay>
          <div>{
              banner && banner.map((item, index) => {
                const imgUrl = `http://fuss10.elemecdn.com/${item.image_hash}.jpeg`
                if (index <= 7) {
                  return (
                    <div key={index} className={styles['banner-item']} onClick={() => this.clickMenu(item)}>
                      <img src={imgUrl} />
                      <p>{item.name}</p>
                    </div>
                  )
                }
              })
            }</div>
          <div>{
            banner && banner.map((item, index) => {
              const imgUrl = `http://fuss10.elemecdn.com/${item.image_hash}.jpeg`
              if (index >= 8) {
                return (
                  <div key={index} className={styles['banner-item']} onClick={() => this.clickMenu(item)}>
                    <img src={imgUrl} />
                    <p>{item.name}</p>
                  </div>
                )
              }
            })
              }</div>
        </Carousel>
        <GoodsList {...{ goodsList }} />
      </div>
    )
  }
}
export default Home
