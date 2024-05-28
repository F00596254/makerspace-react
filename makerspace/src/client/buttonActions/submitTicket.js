export const submitTicket = async (ticketId, comment) => {
  try {
      const response = await fetch('http://localhost:3000/ticket/submitComment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ticketId, comment }),
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('There was an error submitting the comment:', error);
      throw error;
  }
};
