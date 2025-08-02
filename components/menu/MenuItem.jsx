import Link from 'next/link';
import Image from 'next/image';

export default function MenuItem({ item }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={item.image || '/images/default-food.jpg'}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {item.name}
          </h3>
          <span className="bg-primary text-white text-sm font-medium px-2.5 py-0.5 rounded">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        <div className="flex justify-between items-center">
          {item.category && (
            <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
              {item.category}
            </span>
          )}
          <Link
            href={`/menu/${item._id}`}
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}