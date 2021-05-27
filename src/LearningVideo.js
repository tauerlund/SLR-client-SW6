import React from "react";
import ReactPlayer from 'react-player'


const LearningVideo = ({Word}) => {
  return (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url={Word.URL}
            width='400px'
            height='200px'
            loop='true'
            controls='false'
            playing='true'
          />
      </div>
  );
};

export default LearningVideo;