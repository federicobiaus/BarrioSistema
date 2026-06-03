'use client';

import { Badge, Button, Calendar, Card, List, Typography } from 'antd';
import dayjs from 'dayjs';

interface Reservation {
    id: string;
    type?: string;
    title?: string;
    description?: string;
    date?: string;
    status?: string;
    personId?: string;
    person?: { firstName?: string; lastName?: string };
}

interface Props {
    reservations: Reservation[];
    onCancel?: (reservationId: string) => void;
    cancelingReservationId?: string | null;
}

export default function ReservationsCalendar({
    reservations,
    onCancel,
    cancelingReservationId,
}: Props) {
    const eventsByDay = reservations.reduce<Record<string, Reservation[]>>(
        (acc, reservation) => {
            const dateKey = reservation.date
                ? dayjs(reservation.date).format('YYYY-MM-DD')
                : null;

            if (!dateKey) return acc;

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }

            acc[dateKey].push(reservation);
            return acc;
        },
        {},
    );

    const dateCellRender = (value: dayjs.Dayjs) => {
        const dayKey = value.format('YYYY-MM-DD');
        const dayEvents = eventsByDay[dayKey] || [];

        return (
            <ul className="list-none p-0 m-0">
                {dayEvents.slice(0, 3).map((reservation) => (
                    <li key={reservation.id}>
                        <Badge
                            status="success"
                            text={`${reservation.type ? `[${reservation.type}] ` : ''}${reservation.title || 'Reserva'}`}
                        />
                    </li>
                ))}
                {dayEvents.length > 3 && (
                    <li>
                        <Typography.Text type="secondary">+{dayEvents.length - 3} más</Typography.Text>
                    </li>
                )}
            </ul>
        );
    };

    const now = dayjs();

    const canCancel = (reservation: Reservation) => {
        if (reservation.status === 'CANCELLED') return false;
        if (!reservation.date) return false;
        return dayjs(reservation.date).isAfter(now.add(1, 'day'));
    };

    const upcomingReservations = reservations
        .filter((reservation) => reservation.status !== 'CANCELLED')
        .sort((a, b) => {
            const first = a.date ? dayjs(a.date).valueOf() : 0;
            const second = b.date ? dayjs(b.date).valueOf() : 0;
            return first - second;
        })
        .slice(0, 6);

    return (
        <Card className="rounded-2xl shadow" style={{ width: '90%' }}>
            <Typography.Title level={4}>Calendario de reservas</Typography.Title>
            <div
                style={{
                    transform: 'scale(0.8)',
                    transformOrigin: 'top left',
                    width: '120%', // compensar el scale
                }}
            >
                <Calendar  cellRender={dateCellRender} />
            </div>
            <div style={{ marginTop: -160 }}>
                <Typography.Title level={5}>Próximas reservas</Typography.Title>
                <List 
                    dataSource={upcomingReservations}
                    locale={{ emptyText: 'No hay reservas disponibles' }}
                    renderItem={(reservation) => {
                        const cancelDisabled = !onCancel || !canCancel(reservation);
                        const ownerLabel = reservation.person ? ` - ${reservation.person.firstName ?? ''} ${reservation.person.lastName ?? ''}` : '';

                        return (
                            <List.Item
                                actions={
                                    onCancel && reservation.status !== 'CANCELLED'
                                        ? [
                                            <Button
                                                key="cancel"
                                                type="link"
                                                danger
                                                disabled={cancelDisabled}
                                                loading={cancelingReservationId === reservation.id}
                                                onClick={() => onCancel(reservation.id)}
                                            >
                                                Cancelar
                                            </Button>,
                                        ]
                                        : []
                                }
                            >
                                <List.Item.Meta
                                    title={`${reservation.type ? `[${reservation.type}] ` : ''}${reservation.title || 'Reserva'}${ownerLabel}`}
                                    description={
                                        <>
                                            <div>{reservation.description}</div>
                                            <div style={{ color: '#888' }}>
                                                {reservation.date ? dayjs(reservation.date).format('DD/MM/YYYY HH:mm') : 'Fecha no disponible'}
                                            </div>
                                            {reservation.status === 'CANCELLED' && (
                                                <Typography.Text type="danger">Cancelada</Typography.Text>
                                            )}
                                        </>
                                    }
                                />
                            </List.Item>
                        );
                    }}
                />
            </div>
        </Card>
    );
}
