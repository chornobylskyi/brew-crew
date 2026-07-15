export default function ProductList ({ products }) {
    if (!products || !products.length) {
        return (
            <h2>No products</h2>
        );
    }
    const listItems = products.map(product =>
        <li key={product.id}>
            <h3>{product.name}</h3>
            <small>{`Price: ${product.price.toFixed(2)}$`}</small>
        </li>
    );

    return (
        <ul>{listItems}</ul>
    );
}
