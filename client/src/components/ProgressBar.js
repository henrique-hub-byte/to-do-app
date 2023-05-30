const ProgressBar = ({ progress }) => {

  const colors = [
    'rgb(255, 214, 161)',
    'rgb(255, 175, 163)',
    'rgb(108, 115, 148)',
    'rgb(141, 181, 145)',
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  console.log('aqiiiiiiiiiiiiiiiiiiiiiiii')
 console.log(progress);
  return (
    <div>
    <div className="outer_bar">
      
      <div
        className="inner_bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
    </div>
  );
};

export default ProgressBar;
