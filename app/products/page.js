import Link from "next/link";
import Image from "next/image";
export default async function Products() {

  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  return (
    <div>
      <h1>Product List</h1>
      <Link href={`/admin`}>Go to Admin</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.name} - ${product.price}
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                priority
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
