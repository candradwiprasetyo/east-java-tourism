const PageDivider = () => {
  return (
    <div className="shapedividers">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35.28 2.17"
        preserveAspectRatio="none"
      >
        <path fill="#fcece2">
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M0 .5c3.07.55 9.27-.42 16.14 0 6.88.4 13.75.57 19.14-.11V0H0z;
              M0 .6c3.07.65 9.27-.52 16.14.1 6.88.5 13.75.47 19.14-.01V0H0z;
              M0 .5c3.07.55 9.27-.42 16.14 0 6.88.4 13.75.57 19.14-.11V0H0z"
          />
        </path>
        <path opacity="0.4" fill="#fcece2">
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0 1c3.17.8 7.29-.38 10.04-.55 2.75-.17 9.25 1.47 12.67 1.3 3.43-.17 4.65-.84 7.05-.87 2.4-.02 5.52.88 5.52.88V0H0z;
              M0 1.1c3.17.9 7.29-.28 10.04-.45 2.75-.17 9.25 1.37 12.67 1.4 3.43-.17 4.65-.94 7.05-.77 2.4.1 5.52.78 5.52.88V0H0z;
              M0 1c3.17.8 7.29-.38 10.04-.55 2.75-.17 9.25 1.47 12.67 1.3 3.43-.17 4.65-.84 7.05-.87 2.4-.02 5.52.88 5.52.88V0H0z"
          />
        </path>
        <path opacity="0.3" fill="#fcece2">
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M0 1.85c2.56-.83 7.68-.3 11.79-.42 4.1-.12 6.86-.61 9.58-.28 2.73.33 5.61 1.17 8.61 1 3-.19 4.73-.82 5.3-.84V.1H0z;
              M0 1.75c2.56-.93 7.68-.4 11.79-.32 4.1-.12 6.86-.71 9.58-.18 2.73.43 5.61 1.27 8.61 0.9 3-.39 4.73-.72 5.3-.74V.1H0z;
              M0 1.85c2.56-.83 7.68-.3 11.79-.42 4.1-.12 6.86-.61 9.58-.28 2.73.33 5.61 1.17 8.61 1 3-.19 4.73-.82 5.3-.84V.1H0z"
          />
        </path>
      </svg>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .shapedividers {
          position: relative;
          width: 100%;
          height: 120px; /* ditambah dari 110px jadi 130px */
          overflow: hidden;
          padding-bottom: 20px; /* ekstra ruang bawah */
        }

        .shapedividers svg {
          position: absolute;
          bottom: 10px; /* beri ruang agar gerakan ke bawah tetap terlihat */
          left: 0;
          width: 100%;
          height: 120px;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default PageDivider;
