import './notask.css'
function TaskEmptyState() {
    return (
        <div className="task-empty-state">
            <span className='top-empty'></span>
            <span className='middle-content'> No tasks</span>
            <span className='top-empty'></span>
           
        </div>
    );
}
export default TaskEmptyState  