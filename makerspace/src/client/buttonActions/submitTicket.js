export async function submitTicket(formData) {
  try {
    const response = await fetch('http://localhost:3000/ticket/submitTicket', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    console.log('Submission response:', res); // Logging the response for debugging
    alert(res.message);
  } catch (error) {
    console.error('There was an error submitting the ticket:', error);
    alert('An error occurred while submitting the ticket. Please try again later.');
  }
}