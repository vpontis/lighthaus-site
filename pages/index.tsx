import React, {useEffect, useState} from 'react'
import _ from 'lodash';

const NUM_GRAPHS = 1000;

const getScrollPosition = (): number => {
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

const colors = ['red', 'yellow', 'blue', 'green', 'orange', 'lightgold'];

const Index = () => {
  const scrollPosition = useScrollPosition();
  const colorIndex = Math.round(scrollPosition / 500) % colors.length
  const backgroundColor = colors[colorIndex];
  console.log(scrollPosition, colorIndex, backgroundColor);

  return (
    <div style={{backgroundColor}}>
      {_
        .range(NUM_GRAPHS)
        .map((i : number) => {
          return (
            <p key={i}>Hello Next.js</p>
          )
        })}
    </div>
  )
}

export default Index
