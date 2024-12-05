type Option = {
  id: string;
  text: string;
  nextVideo: string;
};

type SurveyOptionsProps = {
  question: string;
  options: Option[];
  onSelect: (nextVideo: string) => void;
};

export default function SurveyOptions({
  question,
  options,
  onSelect,
}: SurveyOptionsProps) {
  return (
    <div className="mt-4">
      <h2 className="mb-2 text-xl font-bold">{question}</h2>
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.nextVideo)}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
