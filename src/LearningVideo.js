import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'


const LearningVideo = (props) => {    

  return (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url=''
            width='512px'
            height='300px'
            loop='true'
            controls='false'
            playing='false'
          />
      </div>
  );
};

export default LearningVideo;