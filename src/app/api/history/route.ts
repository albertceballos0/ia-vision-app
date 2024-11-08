import { db } from '@/lib/firestore';
import { NextResponse } from 'next/server';
import { format } from 'date-fns';

export async function GET() {
    try {
        const query = db.collection('requests');
        const snapshot = await query.get();

        if (snapshot.empty) {
            return NextResponse.json({ success: true, data: [] });
        }

        const historyEntries = snapshot.docs.map(doc => {
            const data = doc.data();
            console.log('data', data);
            return {
                id: doc.id,
                user: data.user,
                type: data.type,
                timestamp: data.timestamp ? format(data.timestamp, 'yyyy-MM-dd HH:mm:ss') : null
            };
        });

        return NextResponse.json({ success: true, data: historyEntries });
    } catch (error) {
        console.error('Error al recuperar las entradas de historial:', error);
        return NextResponse.json(
            { message: 'Error interno al recuperar las entradas de historial' },
            { status: 500 }
        );
    }
}

