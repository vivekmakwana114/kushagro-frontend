"use client";

const PhoneComponent = ({ data, style }) => {
  return (
    <div style={style} className="whitespace-nowrap">
      {data || data === 0 ? data : "-"}
    </div>
  );
};

export default PhoneComponent;
