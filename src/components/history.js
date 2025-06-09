import '../App.css'

export const History = ({ items }) => {
  return (
    <div className='history'>
      {items.map((item) => (
        <div className='historyItem'>
          <img src={item?.flag} />
        </div>
      ))}
    </div>
  )
}
