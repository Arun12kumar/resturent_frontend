import Link from 'next/link';
import { getMenuItems } from '@/lib/api';
import MenuItem from '@/components/menu/MenuItem';

export default async function Home() {
  const featuredItems = await getMenuItems({ featured: true });

  return (
    <div className="container mx-auto px-4">
      <section className="hero py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Restaurant</h1>
        <p className="text-xl mb-8">Experience the finest dining in town</p>
        <Link href="/reservations" className="btn-primary">
          Make a Reservation
        </Link>
      </section>

      <section className="featured-menu py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}