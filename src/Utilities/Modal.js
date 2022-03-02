const Modal = ({ title, subTitle, setModal }) => {
  

  const closeModal = () => setModal(false);
  return (
    <>
      <div className='cover-background' onClick={closeModal}></div>
      <div className='modal'>
        <h2>{title}</h2>
        <h3>{subTitle}</h3>
        <div className='buttons'>
          {/* <div className='off-button' onClick={() => setModal(false)}>cancel</div> */}
          {/* <div className='primary-button' type="submit">done</div> */}
          <button className='primary-button single-button' onClick={closeModal}>okay</button>
        </div>
      </div>
    </>
  )
}

export default Modal;