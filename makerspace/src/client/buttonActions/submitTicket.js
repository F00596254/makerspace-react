export async function submitTicket(data) {
    const formData = new FormData();
  
    // Append all the data fields to the FormData object
    for (const key in data) {
      if (key === 'attachments') {
        data.attachments.forEach((attachment, index) => {
          if (attachment.file) {
            formData.append('attachments', attachment.file, attachment.file.name);
          }
        });
      } else {
        formData.append(key, data[key]);
      }
    }
  
    try {
      const response = await fetch('http://localhost:3000/ticket/submitTicket', {
        method: 'POST',
        body: formData,
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
  