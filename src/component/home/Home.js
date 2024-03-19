import React, { useState } from 'react'
import './home.css'
import { GoPlus } from "react-icons/go";
import { IoIosInformation } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Home = () => {
    const [inputWidth, setInputWidth] = useState('32px');
    const [twoIconClicked, settwoIconClicked] = useState(false)
    const handelTwoIconClick = () => {
        settwoIconClicked(!twoIconClicked)
    }

    const editContent = () => {
        setInputWidth('100px'); 

    }

    return (
        <>
            <div className='inputBoxContainer'>
                <div className='inputBoxContainerInner'>
                    <input type="text" placeholder='Title...' />
                    <input type="text" placeholder='Input...' style={{ height: inputWidth }} />
                  
                </div>
                <span className='plusBtnContainer'><GoPlus /></span>
            </div>
            <div className='mainContainer'>

                <div className='dataContainer'>
                    <div className='textContainer'>
                        <span className='textStyle'>Task Title...</span>
                        <span className='textStyleSmall'>Task body about this task...</span>
                    </div>
                    {!twoIconClicked ? <span className='iconContainer' onClick={handelTwoIconClick}><IoIosInformation /></span>
                        : <div className='iconSubContainer'>
                            <span className='iconContainerdobble' onClick={editContent}><MdEdit /></span>
                            <span className='iconContainerdobblecross' onClick={handelTwoIconClick}><IoMdClose /></span>
                        </div>}
                </div>
            </div>
        </>
    )
}

export default Home