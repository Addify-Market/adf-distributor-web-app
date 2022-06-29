import React from 'react'

export const PreviewImage = ({metadata,token_id, spinner, selectNFTImage}) => {
  return (
    <div className="images" >
                        <div className="image"> 
                            {/* <img src ={nft.metadata.image} onClick={()=>handleNext(nft.token_id)} alt={nft.metadata.name}/> */}
    {console.log('token_id',token_id)}
    {spinner ?(
        
        <img src ={metadata.image} className="addon-preview" onClick={(e)=>selectNFTImage(e,token_id)} alt={metadata.name}/> 
        
        ):(
        <img src ="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"  className="addon-preview" onClick={(e)=>selectNFTImage(e,token_id)} alt={metadata.name}/> 
    )}
    {/* <ClipLoader color="#ffffff" loading={spinner} cssOverride={override} size={150} /> */}
</div>
<div className="title" >
    <span>{metadata.name}</span>
</div>
</div>
  )
}
