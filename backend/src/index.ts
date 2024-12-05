import app from './app.js';
import { connectToDatabase } from './db/connection.js';


const PORT=process.env.PORT || 3000

connectToDatabase().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err)=> {
  console.error('Failed to connect to MongoDB:', err);
})

