export async function submitComment(data){
    try {
        const response = await fetch('http://localhost:3000/ticket/submitComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const res = await response.json();
    
        if (res.message === 'Comment submitted successfully') {
          alert(res.message);
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error('There was an error submitting the comment:', error);
      }
}