export async function submitTicket(data) {
    const {id,comment} = data;
  
    try {
      const response = await fetch('http://localhost:3000/ticket/submitTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {id,comment} ,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const res = await response.json();
  
      if (res.message === 'Ticket submitted successfully') {
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error('There was an error submitting the ticket:', error);
      alert('An error occurred while submitting the ticket. Please try again later.');
    }
  }
  