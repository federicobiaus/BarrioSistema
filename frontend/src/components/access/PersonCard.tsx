export default function PersonCard({
  person,
}: {
  person: any;
}) {
  if (!person) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-4">
      <div className="flex gap-6">
        <img
          src={person.photoUrl}
          className="w-32 h-32 object-cover rounded-xl"
        />

        <div>
          <h2 className="text-xl font-bold">
            {`${person.firstName} ${person.lastName}`}
          </h2>

          <p>DNI: {person.dni}</p>

          <p>Tipo: {person.type}</p>

          <p>
            Estado:{' '}
            {person.isBlocked
              ? 'BLOQUEADO'
              : 'ACTIVO'}
          </p>

          <p>
            Lote: {person.lot} -{' '}
            {person.block}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-bold">
          Vehículos
        </h3>

        {person.vehicles?.map(
          (v: any) => (
            <div key={v.id}>
              {v.plate} - {v.brand}{' '}
              {v.model}
            </div>
          ),
        )}
      </div>
    </div>
  );
}