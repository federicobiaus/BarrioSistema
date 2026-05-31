'use client';

import { Calendar, Badge, Card, List, Typography } from 'antd';
import dayjs from 'dayjs';

interface Reservation {
  id: string;
  type?: string;
  title?: string;
  description?: string;
  date?: string;
  person?: { firstName?: string; lastName?: string };
}

interface Props {
  reservations: Reservation[];
}

export default function ReservationsCalendar({ reservations }: Props) {
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
          <li key={reservation.id} style={{ marginBottom: 4 }}>
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

  return (
    <Card className="rounded-2xl shadow" style={{ minHeight: 700 }}>
      <Typography.Title level={4}>Calendario de reservas</Typography.Title>
      <Calendar cellRender={dateCellRender} />
      <div style={{ marginTop: 24 }}>
        <Typography.Title level={5}>Próximas reservas</Typography.Title>
        <List
          dataSource={reservations.slice(0, 6)}
          locale={{ emptyText: 'No hay reservas disponibles' }}
          renderItem={(reservation) => (
            <List.Item>
              <List.Item.Meta
                title={`${reservation.type ? `[${reservation.type}] ` : ''}${reservation.title || 'Reserva'}`}
                description={
                  <>
                    <div>{reservation.description}</div>
                    <div style={{ color: '#888' }}>
                      {reservation.date ? dayjs(reservation.date).format('DD/MM/YYYY HH:mm') : 'Fecha no disponible'}
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
}
