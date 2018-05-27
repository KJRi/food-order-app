// @flow
import React from 'react'
import styles from './Home.css'
import { Carousel } from 'antd'
import { Link } from 'react-router-dom'
import GoodsList from 'components/GoodsList'

type Props = {}
type State = {
  goodsList: Array<Object>
}

class Home extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      goodsList: []
    }
  }
  componentDidMount () {
    fetch('/good/get', {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      goodsList: res
    }))
  }

  render () {
    const { goodsList } = this.state
    return (
      <div className={styles['containal']}>
        <Carousel autoPlay>
          <div className={styles['img-content']}>
            <Link to='/good/5b07e9ada8c85ec27f0a96e9'>
              <img src='https://img10.360buyimg.com/n1/s450x450_jfs/t9520/185/1855864834/502532/473612f1/59e8930dNb07a4cb1.jpg' />
            </Link>
          </div>
          <div className={styles['img-content']}>
            <Link to='/good/5b07e3b1a8c85ec27f0a96da'>
              <img src='https://img11.360buyimg.com/n1/jfs/t5872/198/5316474280/548619/4a67dd43/595e044dNbaeeb78e.jpg' />
            </Link>
          </div>
          <div className={styles['img-content']}>
            <Link to='/good/5b07e564a8c85ec27f0a96de'>
              <img src='https://img10.360buyimg.com/n1/jfs/t6160/182/2356804797/590998/4115c78a/59610a07N88ac1b59.jpg' />
            </Link>
          </div>
          <div className={styles['img-content']}>
            <Link to='/good/5b07df17a8c85ec27f0a96d0'>
              <img src='https://img14.360buyimg.com/n1/jfs/t17506/61/1832678247/422677/9e63d9d0/5adaf2ceN2d60e73f.jpg' />
            </Link>
          </div>
          <div className={styles['img-content']}>
            <Link to='/good/5b07e49da8c85ec27f0a96dc'>
              <img src='https://img12.360buyimg.com/n1/jfs/t14500/86/387602193/128721/1707c8f1/5a2bb601N229893ca.jpg' />
            </Link>
          </div>
        </Carousel>
        <GoodsList {...{ goodsList }} />
      </div>
    )
  }
}
export default Home
