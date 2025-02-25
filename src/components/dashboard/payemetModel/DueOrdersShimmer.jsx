const DueOrdersShimmer = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8 mt-2">
        <span className="w-32 h-16 bg-gray-200 rounded-lg animate-pulse"></span>
        <div className="flex justify-center items-center gap-8">
          <span className="w-36 h-10 bg-gray-200 rounded-lg animate-pulse"></span>
          <span className="w-20 h-12 bg-gray-200 rounded-lg animate-pulse"></span>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="pp-table">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="w-40 min-w-40">
                <div className="bg-gray-200 h-10 rounded-lg animate-pulse"></div>
              </th>
              <th className="min-w-48">
                <div className="bg-gray-200 h-10 rounded-lg animate-pulse"></div>
              </th>
              <th className="min-w-[18rem]">
                <div className="bg-gray-200 h-10 rounded-lg animate-pulse"></div>
              </th>
              <th className="min-w-[15rem]">
                <div className="bg-gray-200 h-10 rounded-lg animate-pulse"></div>
              </th>
              <th className="min-w-40">
                <div className="bg-gray-200 h-10 rounded-lg animate-pulse"></div>
              </th>
              <th className="min-w-40">
                <div className="bg-gray-200 h-10 rounded-lg animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <td key={index}>
                    <div className="bg-gray-200 h-10 rounded-lg animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DueOrdersShimmer;
