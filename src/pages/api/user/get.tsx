import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
require('env')

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET') {
        try {
            const { userId } = req.query as { userId: string };


            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`);

            const { success, user } = response?.data


            if (success) {
                res.status(200).json({success, user});
            } else {
                res.status(400).json({ success: false, message: 'Erro ao carregar Usuário.' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler