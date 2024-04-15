import type { CartItem, Guitar } from "../types";

type HeaderProps = {
   cart: CartItem[];
   removeCart: (id: Guitar['id']) => void;
   increaseQuantity: (id: Guitar['id']) => void;
   decreaseQuantity: (id: Guitar['id']) => void;
   clearCart: () => void;
   isEmpty: boolean;
   cartTotal: number;
}

const Header = ({cart,
                removeCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                isEmpty,
                cartTotal} : HeaderProps) => {

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="img/carrito.png" alt="imagen carrito" />
                            <div id="carrito" className="bg-white p-3">
                                { isEmpty ? <p className="text-center">Empty Cart</p> :
                                <>
                                <table className="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map( product => {
                                            return (
                                                <tr key={product.id}>
                                            <td>
                                                <img className="img-fluid" src={`img/${product.image}.jpg`} alt={product.name} />
                                            </td>
                                            <td>{product.name}</td>
                                            <td className="fw-bold">
                                                ${product.price}
                                            </td>
                                            <td className="flex align-items-start gap-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-dark"
                                                    onClick={() => decreaseQuantity(product.id)}
                                                >
                                                    -
                                                </button>
                                                {product.quantity}
                                                <button
                                                    type="button"
                                                    className="btn btn-dark"
                                                    onClick={() => increaseQuantity(product.id)}
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    type="button"
                                                    onClick={() => removeCart(product.id)}
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <p className="text-end">Total: <span className="fw-bold">${cartTotal}</span></p>
                                <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCart}>Empty Cart</button>
                                </>}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;