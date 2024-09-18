document.addEventListener('DOMContentLoaded', function () {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalDisplay = document.querySelector('#total');
    const payTotalDisplay = document.querySelector('#pay-total');
    let cartTotal = 0;
    let userBalance = 250000; // Simulated MPESA balance in KSH
    let registeredPhone = '';

    // Add products to the cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseInt(product.getAttribute('data-price'));

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${productName}</td>
                <td>${productPrice}</td>
                <td><button class="remove-item">Remove</button></td>
            `;
            cartTableBody.appendChild(row);

            cartTotal += productPrice;
            updateTotalDisplay();

            // Remove item functionality
            row.querySelector('.remove-item').addEventListener('click', function () {
                cartTableBody.removeChild(row);
                cartTotal -= productPrice;
                updateTotalDisplay();
            });

            alert('Item added to cart!');
        });
    });

    // Update cart total display
    function updateTotalDisplay() {
        totalDisplay.innerText = `Total: KSH ${cartTotal}`;
        payTotalDisplay.innerText = cartTotal;
    }

    // Handle registration
    const registrationForm = document.querySelector('#registration-form');
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        registeredPhone = document.querySelector('#phone').value;
        alert('Registration successful! Your MPESA balance is KSH 250,000.');
    });

    // Handle MPESA payment
    const payButton = document.querySelector('#pay-button');
    const paymentStatus = document.querySelector('#payment-status');

    payButton.addEventListener('click', function () {
        if (!registeredPhone) {
            alert('Please register before checkout.');
            return;
        }

        if (cartTotal <= userBalance) {
            userBalance -= cartTotal;
            paymentStatus.innerText = `Payment successful! Remaining balance: KSH ${userBalance}`;
            cartTotal = 0;
            cartTableBody.innerHTML = ''; // Clear cart
            updateTotalDisplay();
            alert('Payment completed successfully!');
        } else {
            paymentStatus.innerText = 'Insufficient balance!';
        }
    });
});
