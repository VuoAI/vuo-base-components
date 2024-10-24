// import ChefHat from "@vuo/assets/fixfood/icons/chef-hat.svg?react"; TODO add some icon

interface Props {
  color: string;
  title: string;
}

function PlayerItem(props: Props) {
  const { color, title } = props

  return (
    < div
      className='flex align-items-center'
      style={{
        border: `2px solid ${color}`,
        borderRadius: '9999px',
        color: 'white',
      }
      }>
      <div style={{
        backgroundColor: color || 'var(--gray)',
        borderTopLeftRadius: '9999px',
        borderBottomLeftRadius: '9999px',
        height: '100%',
        aspectRatio: '1',
        textAlign: 'center'
      }}>
        <div style={{ margin: '4px' }}>
          {/* <ChefHat /> */}
          ChefHatIcon
        </div>
      </div>
      <div className='ml8' style={{ whiteSpace: 'nowrap', flexGrow: 1, padding: '0px 14px 0px 0px' }}>
        {title}
      </div>
    </div >
  )
}

export default PlayerItem;