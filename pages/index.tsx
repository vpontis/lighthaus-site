import React, {useEffect, useState} from 'react'
import _ from 'lodash';
import axios from 'axios';

import "../public/index.css"
import Header from '../lib/Header';

const CONTENTS_URL = 'https://cdn.contents.io/teams/lighthaus/collections/blog-posts/items/lighthaus'

const getScrollPosition = () : number => {
  if (typeof window === 'undefined') {
    return 0;
  }

  return window.pageYOffset;
}

const SCROLL_THROTTLE_TIME = 100;

const useScrollPosition = () => {
  const [position,
    setPosition] = useState(getScrollPosition());

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      setPosition(getScrollPosition())
    }, SCROLL_THROTTLE_TIME)

    window.addEventListener('scroll', handleScroll, {passive: true})

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return position
}

const colors = [
  'red',
  'yellow',
  'blue',
  'green',
  'orange',
  'lightgold'
];

const useContentsData = (url : string) : {
  isLoading: boolean,
  contentsData: object | null
} => {
  const [isLoading,
    setIsLoading] = useState(true);
  const [data,
    setData] = useState(null);

  const getDataFromContents = async() => {
    const {data: respData} = await axios.get(url);
    console.log('fetching data')

    setData(respData);
    setIsLoading(false);
  }

  useEffect(() => {
    getDataFromContents();
  }, [url]);

  return {isLoading, contentsData: data};
}

const Index = () => {
  const scrollPosition = useScrollPosition();
  const {isLoading, contentsData} = useContentsData(CONTENTS_URL);

  const colorIndex = Math.round(scrollPosition / 500) % colors.length
  const backgroundColor = colors[colorIndex];

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  const {body} = contentsData.properties;

  return (
    <div
      style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '42rem',
      padding: '2.625rem 1.3125rem'
    }}>
      <Header/>
      <div
        className="article-body"
        dangerouslySetInnerHTML={{
        __html: body
      }}/>
    </div>
  )
}

export default Index
