
document.addEventListener('DOMContentLoaded', function() {
  var heading = document.getElementById("formheading");
  var select = document.getElementById("portalselect");

  function updateHeading() {
    var value = select.value;
    switch (value) {
      case 'client':
        heading.textContent = 'Client Portal';
        break;
      case 'seller':
        heading.textContent = 'Seller Portal';
        break;
      case 'customer':
        heading.textContent = 'Customer Care';
        break;
      default:
        heading.textContent = 'Portal';
    }
  }

  // Event listener for change on the select element
  select.addEventListener('change', updateHeading);

  // Call updateHeading on page load
  updateHeading();
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var role = document.getElementById('portalselect').value;
    var role = "seller";
    
    authenticateUser(role, email, password);
});

function authenticateUser(role, email, password) {
    fetch('users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let user = null;
            alert('User authenticated: ' );
            if (role === 'seller' || role === 'client') {
                user = data[role + 's'].find(u => u.email === email && u.password === password);
            } else if (role === 'customer') { // Changed to match the select option value
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
});