import { useEffect, useState } from 'react';
import PaymentSuccessModal from './PaymentSuccessModal';

function Success() {
    const [product, setProduct] = useState(null);
    const [amount, setAmount] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('product');
        const price = urlParams.get('amount');

        if (productName && price) {
            setProduct(productName);
            setAmount(price);
        }
    }, []);

    if (!product || !amount) return null;

    return (
        <PaymentSuccessModal
            product={{ name: product, price: amount }}
            onClose={() => window.location.href = '/store'}
        />
    );
}

export default Success;
