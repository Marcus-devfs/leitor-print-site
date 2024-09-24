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

    if (req.method === 'PATCH') {
        try {
            const { analyticsData, analyticsId } = req.body as { analyticsData: AnalyticsObjectData, analyticsId: string };

            if (!analyticsData || typeof analyticsData !== 'object') {
                return res.status(400).json({ success: false, message: 'Invalid analytics data' });
            }

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/update/${analyticsId}`, { analyticsData });

            if (response?.data) {
                const { success, analytics } = response?.data

                if (success) {
                    return res.status(200).json({ success: true, message: 'Criado.', analytics });
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