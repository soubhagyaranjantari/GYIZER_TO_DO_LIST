import React, { useState } from 'react';
import './home.css';
import { GoPlus } from "react-icons/go";
import { IoIosInformation } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import TaskEmptyState from '../notask/Nostack';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [inputWidth, setInputWidth] = useState('32px');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [clickedTaskId, setClickedTaskId] = useState(null);
    const [clickedTaskIdMobile, setClickedTaskIdMobile] = useState(null);
    const [twoIconClicked, setTwoIconClicked] = useState(null);
    const [idCount, setidCount] = useState(1);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [mobileShow, setMobileShow] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null)

    const handleOpenModal = (task) => {
        setShowModal(true);
        setData(task)
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleTwoIconClick = (taskId) => {
        setClickedTaskId(taskId);
    }

    const handleEditContent = (task) => {
        setInputTitle(task.title);
        setInputContent(task.content);
        setInputWidth('100px');
        setSelectedTask(task);
        setIsEditing(true);
    }

    const handleAddOrUpdateTask = () => {
        if (inputTitle.trim() !== '' && inputContent.trim() !== '') {
            if (isEditing) {
                const updatedTasks = tasks.map(task => {
                    if (task.id === selectedTask.id) {
                        return { ...task, title: inputTitle, content: inputContent };
                    }
                    return task;
                });
                setTasks(updatedTasks);
                setIsEditing(false);
                setTwoIconClicked(true)
            } else {
                setTasks(prevTasks => [...prevTasks, { title: inputTitle, content: inputContent, id: idCount }]);
                setidCount(idCount + 1);
            }
            setInputTitle('');
            setInputContent('');
            setTwoIconClicked(false);
        }
    }

    const handleSaveData = (taskId, newData) => {
        console.log(taskId, "newData");
        console.log("taskId", newData);
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, ...newData };
            }
            return task;
        });
        setTasks(updatedTasks);
    };
    const handleInputChange = (e, field) => {
        const value = e.target.value;
        if (field === 'title') {
            setInputTitle(value);
        } else if (field === 'content') {
            setInputContent(value);
        }

        if (selectedTask) {
            const updatedTasks = tasks.map(task => {
                if (task === selectedTask) {
                    return { ...task, [field]: value };
                }
                return task;
            });
            setTasks(updatedTasks);
        }
    }

    const handleDeleteTask = (taskId) => {
        const task = tasks.find(task => task.id === taskId);
        setTaskToDelete(task);
        setDeleteModalVisible(true);
    }

    const confirmDelete = () => {
        const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
        setTasks(updatedTasks);
        setDeleteModalVisible(false);
        setTwoIconClicked(false);
    }

    const cancelDelete = () => {
        setTaskToDelete(null);
        setDeleteModalVisible(false);
    }

    const handleShowInfoEditBtn = (taskId) => {
        setMobileShow(!mobileShow);
        setClickedTaskIdMobile(taskId);
    }


    return (
        <>
            <div className='inputBoxContainer'>
                <div className='inputBoxContainerInner'>
                    <input
                        type="text"
                        placeholder='Title...'
                        value={inputTitle}
                        onChange={(e) => handleInputChange(e, 'title')}
                    />
                    {!isEditing ? <textarea
                        id='Input'
                        placeholder='Input...'
                        value={inputContent}
                        onChange={(e) => handleInputChange(e, 'content')}
                        style={{ height: inputWidth }}
                    />

                        : <textarea
                            id='show'
                            placeholder='Input...'
                            value={inputContent}
                            onChange={(e) => handleInputChange(e, 'content')}
                            style={{ height: inputWidth }}
                        />}
                </div>
                {!isEditing ? <span className={'plusBtnContainer'} onClick={handleAddOrUpdateTask} title="Add"><GoPlus /></span>
                    : <span className={'plusBtnContainerupdate'} onClick={handleAddOrUpdateTask}>UPDATE</span>}
            </div>
            {tasks.length === 0 ? (
                <div className='mainContainer-no-task'>
                    <TaskEmptyState />
                </div>
            ) : (
                <div className='mainContainer' >
                    {tasks.map((task, index) => (
                        <div className='dataContainer' key={index} onClick={window.innerWidth <= 600 ? () => handleShowInfoEditBtn(task.id) : null}>
                            <div className='textContainer'>
                                <span className='textStyle'>{task.title}</span>
                                <span className='textStyleSmall'>{task.content.slice(0, 20) + "..."}</span>
                            </div>
                            {window.innerWidth <= 700 ?
                                <>
                                    <span className='iconContainerdobblecross' title="Delete" onClick={() => handleDeleteTask(task.id)}><IoMdClose /></span>
                                    {clickedTaskIdMobile === task.id && mobileShow && window.innerWidth <= 600 ?
                                        <div className='mobile-icon-container'>
                                            {
                                                mobileShow ? <>
                                                    <span className='iconContainer info-icon' title="Info" onClick={() => handleTwoIconClick(task.id)}><IoIosInformation /></span>
                                                    <span className='iconContainerdobble edit-icon' title="Edit" onClick={() =>{ handleOpenModal(task)
                                                    handleEditContent(task)}}><MdEdit /></span>

                                                </> : null
                                            }
                                        </div> : null
                                    }
                                </>

                                :
                                <>
                                    {clickedTaskId === task.id ?
                                        <div className='iconSubContainer'>
                                            <span className='iconContainerdobble' title="Edit" onClick={() => handleEditContent(task)}><MdEdit /></span>
                                            <span className='iconContainerdobblecross' title="Delete" onClick={() => handleDeleteTask(task.id)}><IoMdClose /></span>
                                        </div>
                                        :
                                        <span className='iconContainer' title="Info" onClick={() => handleTwoIconClick(task.id)}><IoIosInformation /></span>
                                    }
                                </>
                            }
                        </div>
                    ))}
                </div>

            )}
            {showModal ?
                <>
                    <div className={'modal' ? 'mobile-edit' : ''}>
                        <input
                         id='mobile-edit-input'
                            type="text"
                            placeholder='Title...'
                            value={inputTitle}
                            onChange={(e) => handleInputChange(e, 'title')}
                        />

                        <textarea
                            id='mobile-edit-textaera'
                            placeholder='Input...'
                            value={inputContent}
                            onChange={(e) => handleInputChange(e, 'content')}
                            style={{ height: "300px" }}
                        />
                        <div className="edit-btn">
                            <button className='mobile-edit-btn' onClick={handleCloseModal}>cancel</button>
                            <button className='mobile-edit-btn' onClick={()=>{
                                handleAddOrUpdateTask()
                                setShowModal(false)
                            }}>save</button>
                        </div>
                    </div>
                </>
                : null
            }
            {deleteModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p className='delete-task-model'>Delete this task?</p>
                        <div>
                            <button className="yes-btn" onClick={confirmDelete}>Yes</button>
                            <button className="no-btn" onClick={cancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
