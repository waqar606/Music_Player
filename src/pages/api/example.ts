// URL http://localhost:3000/api/example

import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        res.status(200).send('hello')
    }
  else if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}