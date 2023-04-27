import { useBoard } from '@/hooks/useBoard';
import { CSSProperties } from 'react';

const style: CSSProperties = {
  border: 'solid 1px white',
  padding: '30px'
};

const getStyle = (player: number | null): CSSProperties => ({
  ...style,
  ...(player === 1 ? { backgroundColor: 'red' } : player === 2 ? { backgroundColor: 'blue' } : {})
});

export const Board = () => {
  const { board, player, onClick } = useBoard();

  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div style={{ display: 'flex' }}>
            <>
              {board[i].map((p, col) => (
                <div onClick={() => onClick(col, player)} style={getStyle(p)}></div>
              ))}
            </>
          </div>
        ))}
    </>
  );
};
