import Space from '@vuo/atoms/Space'
import style from './SkewedTitleList.module.scss'

export interface SkewedTitle {
  backgroundColor?: string;
  foregroundColor?: string;
  title: string;
}

interface SkewedTitleListProps {
  items: SkewedTitle[];
  sequential: boolean;
}

function SkewedTitleList(props: SkewedTitleListProps) {
  const { items, sequential = false } = props

  return (
    <Space className={`${style.container} text-center`} direction='vertical'>
      {items.map((item, index) => {
        const delay = sequential ? `${index * 0.3}s` : '0s';
        return (
          <div
            className={`
            ${item.title.length <= 11 ? 'font-h1' : 'font-h2'}
            ${index % 2 === 0 ? style.title_odd : style.title_even}
          `}
            key={`${item.title}_index`}
            style={{
              animationDelay: delay,
              backgroundColor: item.backgroundColor,
              color: item.foregroundColor
            }}
          >{item.title}</div>
        )
      })}
    </Space>
  );
};

export default SkewedTitleList;
