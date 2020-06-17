import React from 'react'

// const CCourseModal = ({ handleClose, show, children }) => {
const CCourseModal = ({ handleClose, show, children }, props) => {
    
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button onClick={handleClose}>close</button>
        </section>
      </div>
    );
  };

  export default CCourseModal