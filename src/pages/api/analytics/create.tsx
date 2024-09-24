import { AnalyticsObjectData } from '@/helpers/types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
require('env')


async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        try {
            const { analyticsData, userId } = req.body as { analyticsData: AnalyticsObjectData, userId: string };

            if (!analyticsData || typeof analyticsData !== 'object') {
                return res.status(400).json({ success: false, message: 'Invalid analytics data' });
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/analytics/create`, { analyticsData, userId });

            console.log(response)

            if (response?.data) {
                const { success, newAnalytics } = response?.data

                if (success) {
                    return res.status(200).json({ success: true, message: 'Criado.', analyticsId: newAnalytics?._id });
                } else {
                    res.status(200).json({ success: false, message: 'Erro ao criar.' });
                }

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