const Section = ({ title, children }) => {
  return (
    <section>
      <div className='bold-title'>{title}</div>
      {children}
    </section>
  )
}

export default Section;