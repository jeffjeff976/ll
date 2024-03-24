class Portal {
  constructor() {
    this.heading = document.getElementById("formheading");
    this.select = document.getElementById("portalselect");
    this.loginForm = document.getElementById('loginForm');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');

    this.select.addEventListener('change', this.updateHeading.bind(this));
    this.loginForm.addEventListener('submit', this.onSubmit.bind(this));

    this.updateHeading(); // Call updateHeading on page load
  }

  updateHeading() {
    const value = this.select.value;
    switch (value) {
      case 'client':
        this.heading.textContent = 'Client Portal';
        break;
      case 'seller':
        this.heading.textContent = 'Seller Portal';
        break;
      case 'customer':
        this.heading.textContent = 'Customer Care';
        break;
      default:
        this.heading.textContent = 'Portal';
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const role = this.select.value;

    this.authenticateUser(role, email, password);
  }

  authenticateUser(role, email, password) {
    fetch('users.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let user = null;
        if (role === 'seller' || role === 'client') {
          user = data[role + 's'].find(u => u.email === email && u.password === password);
        } else if (role === 'customer') {
          user = data.customerSupport.find(u => u.staffId === email && u.password === password);
        }

        if (user) {
          alert('User authenticated: ' + user.name);
        } else {
          alert('Authentication failed');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error.message);
      });
  }
}

const portal = new Portal();