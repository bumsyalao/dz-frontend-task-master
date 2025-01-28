// import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form>
        {/* Shipping Information Form */}
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg mt-4">
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price * item.quantity}</p>
          </div>
        ))}
        <p className="text-xl font-semibold mt-4">Total: ${totalPrice}</p>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Place Order
        </button>
      </div>
    </div>
  );
}