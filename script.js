document.addEventListener('DOMContentLoaded', function () {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalDisplay = document.querySelector('#total');
    const payTotalDisplay = document.querySelector('#pay-total');
    let cartTotal = 0;

    // Add products to the cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseInt(product.getAttribute('data-price'));

            const row = document.createElement('tr');
            row.innerHTML = `<td>${productName}</td><td>${productPrice}</td>`;
            cartTableBody.appendChild(row);

            cartTotal += productPrice;
            totalDisplay.innerText = `Total: KSH ${cartTotal}`;
            payTotalDisplay.innerText = cartTotal;
        });
    });

    // Handle registration
    const registrationForm = document.querySelector('#registration-form');
    let registeredPhone = '';
    let userBalance = 10000; // Simulated balance in KSH

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        registeredPhone = document.querySelector('#phone').value;
        alert('Registration successful! Your MPESA balance is KSH 10,000.');
    });

    // Handle payment via MPESA
    const payButton = document.querySelector('#pay-button');
    const paymentStatus = document.querySelector('#payment-status');

    payButton.addEventListener('click', function () {
        if (registeredPhone === '') {
            alert('Please register before checkout.');
            return;
        }

        if (cartTotal <= userBalance) {
            userBalance -= cartTotal;
            paymentStatus.innerText = `Payment successful! Remaining balance: KSH ${userBalance}`;
            cartTotal = 0;
            totalDisplay.innerText = 'Total: KSH 0';
            payTotalDisplay.innerText = '0';
            cartTableBody.innerHTML = ''; // Clear cart
        } else {
            paymentStatus.innerText = 'Insufficient balance!';
        }
    });
});
