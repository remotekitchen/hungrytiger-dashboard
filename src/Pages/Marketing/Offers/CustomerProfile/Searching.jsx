import React from 'react'
import Lottie from 'react-lottie-player'
import lottieJson from '../../../../assets/lottie/searchingLottie.json'
const Searching = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 350, height: 350 }}
    />
  )
}

export default Searching
