import React from "react";

const IdeaCard = ({ props }) => {
  const statusColor =
    props.acceptedStatus == 1
      ? "bg-green-500" // Active (Green)
      : props.acceptedStatus == 0
      ? "bg-red-500" // Inactive (Red)
      : "bg-yellow-500"; // Null (Yellow)

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg overflow-hidden hover:rounded-xl hover:shadow-slate-300 transition-all">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-800">{props.ideaTitle}</h2>
        <span className="text-xs text-gray-600">{props.ideaInfo}</span>

        <div className="mt-4 flex gap-4">
          <p className="text-sm bg-purple-200 p-2 rounded text-purple-600">{props.equity}</p>
          <p className="text-sm text-green-600 bg-green-200 p-2 rounded">{props.ideaType}</p>
        </div>


        {/* Show reason if rejected (acceptedStatus === 0) */}
        {props.acceptedStatus == 0 && props.reason && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="text-sm font-semibold">Rejection Reason:</p>
            <p className="text-xs">{props.reason}</p>
          </div>
        )}
                <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <p className="mr-2 text-sm font-medium">Status:</p>
            <div className={`rounded-full w-3 h-3 ${statusColor}`}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IdeaCard;
