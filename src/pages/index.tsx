import { Board } from '@/components/board';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div>Welcome to Connect 4!</div>
      <Board />
    </>
  );
}
