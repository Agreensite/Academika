// Admin Credentials (In production, use proper backend authentication)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadOrders();
});

function initializeEventListeners() {
    // Order Form
    const orderModal = document.getElementById('orderModal');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const orderForm = document.getElementById('orderForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    // Close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Window click to close modal
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    });

    // Order form submit
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }

    // Admin login form submit
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }

    // Admin toggle
    const adminToggle = document.getElementById('adminToggle');
    if (adminToggle) {
        adminToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
            if (isLoggedIn) {
                showAdminPanel();
            } else {
                adminLoginModal.classList.add('active');
            }
        });
    }
}

// Order Service
function orderService(serviceType) {
    const modal = document.getElementById('orderModal');
    document.getElementById('serviceType').value = serviceType;
    document.getElementById('orderForm').reset();
    modal.classList.add('active');
}

// Handle Order Submit
function handleOrderSubmit(e) {
    e.preventDefault();
    
    const order = {
        id: 'ORD' + Date.now(),
        serviceType: document.getElementById('serviceType').value,
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail').value,
        customerPhone: document.getElementById('customerPhone').value,
        description: document.getElementById('customerDescription').value,
        deadline: document.getElementById('customerDeadline').value,
        status: 'pending',
        createdAt: new Date().toLocaleString()
    };

    // Get existing orders
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert(t('success_order'));
    document.getElementById('orderModal').classList.remove('active');
    document.getElementById('orderForm').reset();
}

// Handle Admin Login
function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('adminLoginModal').classList.remove('active');
        showAdminPanel();
        alert(t('success_login'));
    } else {
        alert(t('error_login'));
        document.getElementById('adminLoginForm').reset();
    }
}

// Show Admin Panel
function showAdminPanel() {
    const mainContent = document.querySelector('.main-content');
    
    // Remove existing admin panel if any
    const existingPanel = document.querySelector('.admin-panel');
    if (existingPanel) {
        existingPanel.remove();
    }

    const adminPanel = document.createElement('div');
    adminPanel.className = 'admin-panel';
    adminPanel.innerHTML = `
        <div class="admin-header">
            <h2>${t('admin_panel')}</h2>
            <button class="logout-btn" onclick="logoutAdmin()">${t('admin_logout')}</button>
        </div>
        <div id="ordersContainer">
            <h3>${t('admin_orders')}</h3>
            <table class="orders-table">
                <thead>
                    <tr>
                        <th>${t('order_id')}</th>
                        <th>${t('customer_info')}</th>
                        <th>${t('service')}</th>
                        <th>${t('status')}</th>
                        <th>${t('actions')}</th>
                    </tr>
                </thead>
                <tbody id="ordersTableBody">
                </tbody>
            </table>
        </div>
    `;

    mainContent.innerHTML = '';
    mainContent.appendChild(adminPanel);
    loadOrdersIntoTable();
}

// Load orders into table
function loadOrdersIntoTable() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem;">No orders yet</td></tr>';
        return;
    }

    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        const statusClass = `status-${order.status}`;
        const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1);

        row.innerHTML = `
            <td>${order.id}</td>
            <td>
                <strong>${order.customerName}</strong><br>
                <small>${order.customerEmail}</small><br>
                <small>${order.customerPhone}</small>
            </td>
            <td>${getServiceName(order.serviceType)}</td>
            <td><span class="status-badge ${statusClass}">${t(order.status)}</span></td>
            <td>
                ${order.status === 'pending' ? `
                    <button class="action-btn approve-btn" onclick="updateOrderStatus(${index}, 'completed')">${t('approve')}</button>
                    <button class="action-btn reject-btn" onclick="updateOrderStatus(${index}, 'rejected')">${t('reject')}</button>
                ` : '-'}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Update order status
function updateOrderStatus(index, status) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders[index].status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrdersIntoTable();
}

// Logout admin
function logoutAdmin() {
    sessionStorage.removeItem('adminLoggedIn');
    location.reload();
}

// Load orders
function loadOrders() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn) {
        showAdminPanel();
    }
}

// Get service name
function getServiceName(serviceType) {
    const serviceNames = {
        'translation': t('service_translation'),
        'editing': t('service_editing'),
        'admin': t('service_admin'),
        'presentation': t('service_presentation'),
        'autocad': t('service_autocad'),
        'businesscard': t('service_businesscard')
    };
    return serviceNames[serviceType] || serviceType;
}
