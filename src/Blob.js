import React from "react";

const Blobby = (props) => {
    const arrayBufferView = new Uint8Array( props );
    const blob = new Blob( [ props.props ], { type: "video/webm" } );

    const url = URL.createObjectURL(blob)

    console.log(blob)

    return (
       <>
       <h1>Blob:</h1>
   
        { props.props ? 
            
            <video controls width="250">
                <source src={url}
                        type="video/webm"/>
            </video>

        
        : null}

      </>
    );
  };
  export default Blobby;