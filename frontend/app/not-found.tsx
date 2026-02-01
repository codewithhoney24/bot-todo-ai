import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-6xl font-black text-amber-500 mb-4">404</h2>
      <p className="text-2xl font-bold text-white mb-2">Page Not Found</p>
      <p className="text-amber-200/50 mb-8">The page you are looking for does not exist.</p>
      <Link href="/">
        <Button className="bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-xl">
          Return Home
        </Button>
      </Link>
    </div>
  );
}