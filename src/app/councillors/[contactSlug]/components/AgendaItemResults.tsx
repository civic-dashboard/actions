import { AgendaItem } from '@/app/councillors/[contactSlug]/types';

const formatDate = (dateString: string) => {
  if (!dateString) return dateString;
  return dateString.split(' ')[0]; // Only return the date part before the space
};

function AgendaItemCard({ item }: { item: AgendaItem }) {
  const getVoteIcon = (value: string) => {
    switch (value.toLowerCase()) {
      case 'yes':
        return '✓';
      case 'no':
        return '✗';
      case 'absent':
        return 'AB';
      default:
        return '-';
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="text-sm text-gray-500 mb-2">
        {formatDate(item.dateTime)}
      </div>
      <h3 className="font-medium mb-2">{item.agendaItemTitle}</h3>
      <div className="flex justify-between text-sm">
        <div>Result: {item.resultKind === 'Carried' ? '✓' : '✗'}</div>
        <div>Vote: {getVoteIcon(item.value)}</div>
      </div>
    </div>
  );
}

export default function AgendaItemResults({
  agendaItems,
  searchTerm = '',
}: {
  agendaItems: AgendaItem[];
  searchTerm?: string;
}) {
  const filteredItems = agendaItems.filter((item) =>
    item.agendaItemTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log(agendaItems);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>{filteredItems.length} results</div>
        <button className="text-blue-600 hover:text-blue-800">Reset</button>
      </div>

      <div>
        {filteredItems
          .sort(
            (a, b) =>
              new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
          )
          .map((item) => (
            <AgendaItemCard
              key={`${item.agendaItemNumber}-${item.motionId}`}
              item={item}
            />
          ))}
      </div>
    </div>
  );
}
