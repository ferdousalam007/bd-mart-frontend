const StatsCard = ({ title, value,  }: any) => {
  return (
    <div
      className={`relative bg-primary-white rounded-lg shadow-md p-6 border-l-4 $transition-transform transform hover:scale-105 hover:shadow-lg`}
    >
      <div className={`flex items-center justify-between mb-4`}>
        <div className="text-2xl"></div>
      </div>
      <h3 className="text-xl font-semibold text-primary-text">{title}</h3>
      <p className={`text-3xl font-bold  mt-2`}>{value}</p>
    </div>
  );
};

export default StatsCard;
