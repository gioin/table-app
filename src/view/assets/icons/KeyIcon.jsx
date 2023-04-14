function KeyIcon() {
  return (
    <div className="bg-[#7E7EF1] w-[48px] h-[32px] rounded-[30px] flex justify-center items-center mr-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <defs>
          <style>{`.a{fill:none;}.b{fill:#fff;}`}</style>
        </defs>
        <path className="a" d="M0,0H24V24H0Z" />
        <path
          className="b"
          d="M12.65,10a6,6,0,1,0,0,4H17v4h4V14h2V10ZM7,14a2,2,0,1,1,2-2A2.006,2.006,0,0,1,7,14Z"
        />
      </svg>
    </div>
  );
}

export default KeyIcon;
