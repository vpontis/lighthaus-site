import React, { useEffect, useState } from 'react'
import _ from 'lodash';
import axios from 'axios';

import "../public/index.css"
import Header from '../lib/Header';

const CONTENTS_URL = 'https://cdn.contents.io/teams/lighthaus/collections/blog-posts/items/lighthaus'

const getScrollPosition = (): number => {
  if (typeof window === 'undefined') {
    return 0;
  }

  return window.pageYOffset;
}

const SCROLL_THROTTLE_TIME = 25;

const useScrollPosition = () => {
  const [position,
    setPosition] = useState(getScrollPosition());

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      setPosition(getScrollPosition())
    }, SCROLL_THROTTLE_TIME)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return position
}

interface HSLColor {
  hue: number,
  saturation: number,
  lightness: number
}

const colors: HSLColor[] = [
  {
    hue: 0,
    saturation: 26,
    lightness: 60
  }, {
    hue: 360,
    saturation: 26,
    lightness: 60
  }
];

const useContentsData = (url: string): {
  isLoading: boolean,
  contentsData: object | null
} => {
  const [isLoading,
    setIsLoading] = useState(true);
  const [data,
    setData] = useState(null);

  const getDataFromContents = async () => {
    const { data: respData } = await axios.get(url);
    console.log('fetching data')

    setData(respData);
    setIsLoading(false);
  }

  useEffect(() => {
    getDataFromContents();
  }, [url]);

  return { isLoading, contentsData: data };
}

const interpolateColors = (color1: HSLColor, color2: HSLColor, ratio: number): HSLColor => {
  return {
    hue: color1.hue + (color2.hue - color1.hue) * ratio,
    saturation: color1.saturation + (color2.saturation - color1.saturation) * ratio,
    lightness: color1.lightness + (color2.lightness - color1.lightness) * ratio
  }
}

const Index = () => {
  const scrollPosition = useScrollPosition();
  const { isLoading, contentsData } = useContentsData(CONTENTS_URL);

  let colorFraction = (scrollPosition / 3000) % 2;

  if (colorFraction > 1) {
    colorFraction = 2 - colorFraction;
  }

  const color: HSLColor = interpolateColors(colors[0], colors[1], colorFraction)
  console.log(color, scrollPosition, Math.round(colorFraction * 100));
  const alpha = Math.min(scrollPosition / 1000, 0.2);

  return (
    <div
      style={{
        backgroundColor: `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${alpha})`
      }}>
      <Header />
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '42rem',
          padding: '2.625rem 1.3125rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            style={{
              maxWidth: 400,
            }}
            src='./static/lighthaus-blue.gif'
          />
        </div>

        {isLoading ? (

          <div>Loading...</div>
        ) : (
            <div
              className="article-body"
              dangerouslySetInnerHTML={{
                __html: contentsData.properties.body
              }} />

          )}
      </div>
    </div>
  )
}

export default Index
