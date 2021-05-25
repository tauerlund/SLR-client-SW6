import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'


const LearningVideo = (props) => {    

  return (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            width='512px'
            height='300px'
            loop='true'
            controls='false'
            playing='true'
          />
      </div>
  );
};

export default LearningVideo;