import React from 'react'
import MessageContainer from './MessageContainer';
import Sideebar from './Sideebar';

const HomePage = () => {
  return (
    <div className='flex  sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sideebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage