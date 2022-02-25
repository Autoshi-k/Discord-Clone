import { useState } from 'react';

const ModalUpdate = ({ inputs, title, subTitle, modal }) => {
  // inputs: [{ name, type, label, placeholder }]
  console.log('in modal', modal.modalState)

  return (
    <>
      <div className='cover-background'></div>
      <div className='modal'>
        <form>
          <h2>{title}</h2>
          <h3>{subTitle}</h3>
          { 
            inputs.map(input => {
              return (
                <>
                  { input.label && <label for={input.name}>{input.name}</label> }
                  <input type={input.type} name={input.name} placeholder={input.placeholder} />
                </>
              )
            })
          }
          <div className='buttons'>
            <div className='off-button' onClick={() => modal.setModalState(false)}>cancel</div>
            <div className='primary-button' type="submit">done</div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ModalUpdate;