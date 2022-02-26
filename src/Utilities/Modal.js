import { useRef } from 'react';

const ModalUpdate = ({ inputs, title, subTitle, modal, setModal }) => {
  const updateForm = useRef();
  // inputs: [{ name, type, label, placeholder }]

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateForm.current);
    // console.log(updateForm.current['nickname'].value)
  }

  return (
    <>
      <div className='cover-background'></div>
      <div className='modal'>
        <form onSubmit={handleSubmit} ref={updateForm}>
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
            <div className='off-button' onClick={() =>setModal(false)}>cancel</div>
            {/* <div className='primary-button' type="submit">done</div> */}
            <input className='primary-button' value='done' type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}

export default ModalUpdate;