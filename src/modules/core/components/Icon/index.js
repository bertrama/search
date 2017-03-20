import React from 'react';

const Icon = ({ name }) => {
  switch (name) {
    case 'alert':
      return (
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-857.000000, -61.000000)" fill="#000000">
                    <g transform="translate(822.000000, 60.000000)">
                        <g transform="translate(34.000000, 0.000000)">
                            <path d="M11.9994,11.998 L9.9994,11.998 L9.9994,5.99805 L11.9994,5.99805 L11.9994,11.998 Z M11.9994,15.998 L9.9994,15.998 L9.9994,13.998 L11.9994,13.998 L11.9994,15.998 Z M10.9994,0.99805 C5.47639,0.99805 0.99939,5.47504 0.99939,10.998 C0.99939,16.5211 5.47639,20.998 10.9994,20.998 C16.5224,20.998 20.9994,16.5211 20.9994,10.998 C20.9994,5.47504 16.5224,0.99805 10.9994,0.99805 L10.9994,0.99805 Z"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'article':
    case 'journal article':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 18 18" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-211.000000, -136.000000)">
                    <g transform="translate(68.000000, 61.000000)">
                        <g transform="translate(143.000000, 75.000000)">
                            <path d="M2,9.99999997e-06 L16,9.99999997e-06 C17.1046,9.99999997e-06 18,0.89544 18,2.00001 L18,16 C18,17.1046 17.1046,18 16,18 L2,18 C0.89543,18 0,17.1046 0,16 L0,2.00001 C0,0.89544 0.89543,9.99999997e-06 2,9.99999997e-06 L2,9.99999997e-06 Z M4,4.00001 L4,6.00001 L14,6.00001 L14,4.00001 L4,4.00001 L4,4.00001 Z M4,8 L4,10 L14,10 L14,8 L4,8 L4,8 Z M4,12 L4,14 L11,14 L11,12 L4,12 L4,12 Z"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'check':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 20 20" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-168.000000, -957.000000)">
                    <g transform="translate(60.000000, 918.000000)">
                        <g transform="translate(107.000000, 38.000000)">
                            <path d="M8.99939,15.9981 L3.99939,10.9981 L5.41339,9.5841 L8.99939,13.1701 L16.5854,5.58407 L17.9994,6.99807 L8.99939,15.9981 Z M10.9994,0.99807 C5.47639,0.99807 0.99939,5.47507 0.99939,10.9981 C0.99939,16.5211 5.47639,20.9981 10.9994,20.9981 C16.5214,20.9981 20.9994,16.5211 20.9994,10.9981 C20.9994,5.47507 16.5214,0.99807 10.9994,0.99807 L10.9994,0.99807 Z"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'database':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 16 18" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-557.000000, -635.000000)">
                    <g transform="translate(519.000000, 562.000000)">
                        <g transform="translate(38.000000, 73.000000)">
                            <path d="M8,0 C3.58172,0 0,1.7909 0,4 C0,6.2091 3.58172,8 8,8 C12.4183,8 16,6.2091 16,4 C16,1.7909 12.4183,0 8,0 L8,0 Z M0,6 L0,9 C0,11.2091 3.58172,13 8,13 C12.4183,13 16,11.2091 16,9 L16,6 C16,8.2091 12.4183,10 8,10 C3.58172,10 0,8.2091 0,6 L0,6 Z M0,11 L0,14 C0,16.2091 3.58172,18 8,18 C12.4183,18 16,16.2091 16,14 L16,11 C16,13.2091 12.4183,15 8,15 C3.58172,15 0,13.2091 0,11 L0,11 Z"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'multi-result':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 16 16" version="1.1" className="icon">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Silo-Navigation-Catalog" transform="translate(-372.000000, -16.000000)">
              <g id="Silo-Navigation" transform="translate(372.000000, 12.000000)">
                <path d="M9,4 L9,9 L16,9 L16,4 L9,4 Z M9,20 L16,20 L16,11 L9,11 L9,20 Z M0,20 L7,20 L7,15 L0,15 L0,20 Z M0,13 L7,13 L7,4 L0,4 L0,13 L0,13 Z" id="Shape"></path>
              </g>
            </g>
          </g>
        </svg>
      )
    case 'search':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 16 16" version="1.1" className="icon">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Search-Field" transform="translate(-950.000000, -28.000000)">
              <g id="Search-Button" transform="translate(934.000000, 16.000000)">
                <g id="Icon-Search" transform="translate(16.000000, 12.000000)">
                  <path d="M5.77777778,0 C8.9688,0 11.5555556,2.5868 11.5555556,5.77777778 C11.5555556,7.21324444 11.032,8.52648889 10.1655111,9.53697778 L10.4063111,9.77777778 L11.1111111,9.77777778 L15.5555556,14.2222222 L14.2222222,15.5555556 L9.77777778,11.1111111 L9.77777778,10.4063111 L9.53697778,10.1655111 C8.52648889,11.032 7.21324444,11.5555556 5.77777778,11.5555556 C2.5868,11.5555556 0,8.9688 0,5.77777778 C0,2.5868 2.5868,0 5.77777778,0 L5.77777778,0 Z M5.77777778,1.77778667 C3.56864,1.77778667 1.77777778,3.56864889 1.77777778,5.77778667 C1.77777778,7.98693333 3.56864,9.77777778 5.77777778,9.77777778 C7.98693333,9.77777778 9.77777778,7.98693333 9.77777778,5.77778667 C9.77777778,3.56864889 7.98693333,1.77778667 5.77777778,1.77778667 L5.77777778,1.77778667 Z" id="Shape"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      )
    case 'timetable':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 20 20" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-658.000000, -480.000000)">
                    <g transform="translate(519.000000, 289.000000)">
                        <g transform="translate(139.000000, 191.000000)">
                            <path d="M12,10 L13.5,10 L13.5,12.823 L15.9382,14.2307 L15.1882,15.5297 L12,13.689 L12,10 L12,10 Z M2,9.99999997e-06 L16,2e-05 C17.1046,2e-05 18,0.89545 18,2.00002 L18,8.101 C19.2372,9.3636 20,11.0927 20,13 C20,16.866 16.866,20 13,20 C11.0927,20 9.3636,19.2372 8.101,18 L2,18 C0.89543,18 0,17.1046 0,16 L0,2.00001 C0,0.89544 0.89543,9.99999997e-06 2,9.99999997e-06 L2,9.99999997e-06 Z M2,13 L2,16 L6.67363,16 C6.24169,15.0907 6,14.0736 6,13 L2,13 L2,13 Z M2,6.00001 L8,6 L8,3 L2,3.00001 L2,6.00001 L2,6.00001 Z M16,6.00001 L16,3.00001 L10,3 L10,6 L16,6.00001 L16,6.00001 Z M2,11 L6.28987,11 C6.63282,9.8477 7.2645,8.8197 8.101,8 L2,8 L2,11 L2,11 Z M13,8.1539 C10.3235,8.1539 8.1538,10.3236 8.1538,13 C8.1538,15.6765 10.3235,17.8462 13,17.8462 C15.6764,17.8462 17.8461,15.6765 17.8461,13 C17.8461,10.3236 15.6764,8.1539 13,8.1539 L13,8.1539 Z"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'wand':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 40 40" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-700.000000, -224.000000)" fillRule="nonzero">
                    <path d="M712.38424,230.856327 L707.622902,233.522676 L710.289251,228.761338 L707.622902,224 L712.38424,226.666349 L717.145578,224 L714.479229,228.761338 L717.145578,233.522676 L712.38424,230.856327 L712.38424,230.856327 Z M735.238662,249.520771 L740,246.854422 L737.333651,251.61576 L740,256.377098 L735.238662,253.710749 L730.477324,256.377098 L733.143673,251.61576 L730.477324,246.854422 L735.238662,249.520771 L735.238662,249.520771 Z M740,224 L737.333651,228.761338 L740,233.522676 L735.238662,230.856327 L730.477324,233.522676 L733.143673,228.761338 L730.477324,224 L735.238662,226.666349 L740,224 L740,224 Z M723.506725,244.530889 L728.153791,239.883823 L724.116177,235.846209 L719.469111,240.493275 L723.506725,244.530889 L723.506725,244.530889 Z M725.468397,234.074991 L729.925009,238.531603 C730.667778,239.236281 730.667778,240.474229 729.925009,241.216998 L707.699083,263.442923 C706.956315,264.185692 705.718367,264.185692 705.013689,263.442923 L700.557077,258.986311 C699.814308,258.281633 699.814308,257.043685 700.557077,256.300917 L722.783002,234.074991 C723.525771,233.332222 724.763719,233.332222 725.468397,234.074991 Z" id="Shape" transform="translate(720.000000, 244.000000) rotate(-90.000000) translate(-720.000000, -244.000000) "></path>
                </g>
            </g>
        </svg>
      )
    case 'book':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 16 20" version="1.1" className="icon">
            <g id="Reference:-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Icons" transform="translate(-279.000000, -61.000000)">
                    <g id="Format" transform="translate(68.000000, 61.000000)">
                        <g id="book-variant-copy" transform="translate(211.000000, 0.000000)">
                            <path d="M2,2 L7,2 L7,10 L4.5,8.5 L2,10 L2,2 Z M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,18 C0,19.1 0.9,20 2,20 L14,20 C15.1,20 16,19.1 16,18 L16,2 C16,0.9 15.1,0 14,0 L14,0 Z" id="Shape"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'file':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 32 40" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-670.000000, -224.000000)">
                    <g id="file-document-copy" transform="translate(670.000000, 224.000000)">
                        <path d="M18.00002,14 L29.00002,14 L18.00002,3 L18.00002,14 L18.00002,14 Z M4,0 L20.00002,0 L32.00002,12 L32.00002,36.00006 C32.00002,38.20806 30.20802,40.00006 28.00002,40.00006 L3.97998,40.00006 C1.77198,40.00006 0,38.20806 0,36.00006 L0.02002,4 C0.02002,1.792 1.78996,0 4,0 L4,0 Z M22.00122,32.00386 L22.00122,28.00386 L3.98124,28.00386 L3.98124,32.00386 L22.00122,32.00386 L22.00122,32.00386 Z M28.00122,24.00386 L28.00122,20.00386 L3.98124,20.00386 L3.98124,24.00386 L28.00122,24.00386 L28.00122,24.00386 Z" id="Shape"></path>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'music':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 40 40" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-734.000000, -224.000000)">
                    <g id="music-circle-copy" transform="translate(734.000000, 224.000000)">
                        <path d="M28,14 L28,10 L20,10 L20,21.02 C19.16,20.38 18.14,20 17,20 C14.24,20 12,22.24 12,25 C12,27.76 14.24,30 17,30 C19.76,30 22,27.76 22,25 L22,14 L28,14 L28,14 Z M20,0 C31.0456,0 40,8.9543 40,20 C40,31.0458 31.0456,40 20,40 C8.9543,40 0,31.0458 0,20 C0,8.9543 8.9543,0 20,0 L20,0 Z" id="Shape"></path>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'image':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 40 40" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-806.000000, -224.000000)">
                    <g transform="translate(806.000000, 224.000000)">
                        <path d="M4,0 L36,0 C38.2092,0 40,1.79084 40,3.99998 L40,35.99998 C40,38.20918 38.2092,39.99998 36,39.99998 L4,39.99998 C1.79086,39.99998 0,38.20918 0,35.99998 L0,3.99998 C0,1.79084 1.79086,0 4,0 L4,0 Z M10,3.99998 C7.23858,3.99998 5,6.23856 5,8.99998 C5,11.7614 7.23858,13.99998 10,13.99998 C12.76142,13.99998 15,11.7614 15,8.99998 C15,6.23856 12.76142,3.99998 10,3.99998 L10,3.99998 Z M4,31.99998 L4,35.99998 L36,35.99998 L36,23.99998 L30,17.99998 L18,29.99998 L12,23.99998 L4,31.99998 L4,31.99998 Z"></path>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'online journal':
    case 'journal':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 18 20" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-135.000000, -61.000000)">
                    <g transform="translate(68.000000, 61.000000)">
                        <g transform="translate(67.000000, 0.000000)">
                            <path d="M15.9999,16.0007 L6.00002,15.9997 C4.8965,15.9997 4.00002,15.1037 4.00002,13.9997 L3.99999,2.00016 C3.99999,0.89616 4.89647,0.00016 5.99998,0.00016 L15.9999,0.00114 C17.1048,0.00114 17.9998,0.89713 17.9998,2.00114 L17.9999,14.0007 C17.9999,15.1047 17.1049,16.0007 15.9999,16.0007 L15.9999,16.0007 Z M6.99995,7.00066 L8.9999,5.50131 L10.9999,7.00091 L11,2 L7,2 L6.99995,7.00066 L6.99995,7.00066 Z M14,18 L14,20 L2,20 C0.89543,20 0,19.1046 0,18 L0,4.00001 L2,4 L2,18 L14,18 L14,18 Z"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'website':
    case 'library website':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 20 20" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-696.000000, -711.000000)">
                    <g transform="translate(519.000000, 562.000000)">
                        <g transform="translate(177.000000, 148.000000)">
                            <path d="M14.3607,12.998 C14.4427,12.3411 14.4997,11.6771 14.4997,10.998 C14.4997,10.319 14.4427,9.655 14.3607,8.99805 L17.7367,8.99805 C17.9027,9.6381 17.9997,10.306 17.9997,10.998 C17.9997,11.6901 17.9027,12.358 17.7367,12.998 L14.3607,12.998 Z M12.5927,18.559 C13.1927,17.446 13.6487,16.248 13.9717,14.998 L16.9207,14.998 C15.9617,16.652 14.4297,17.928 12.5927,18.559 L12.5927,18.559 Z M12.3387,12.998 L7.6597,12.998 C7.5647,12.343 7.49969,11.6791 7.49969,10.998 C7.49969,10.317 7.5647,9.6531 7.6597,8.99805 L12.3387,8.99805 C12.4337,9.6531 12.4997,10.317 12.4997,10.998 C12.4997,11.6791 12.4337,12.343 12.3387,12.998 L12.3387,12.998 Z M9.9977,18.962 C9.1657,17.762 8.5157,16.4291 8.0887,14.998 L11.9097,14.998 C11.4817,16.4291 10.8317,17.762 9.9977,18.962 L9.9977,18.962 Z M6.0257,6.99805 L3.07669,6.99805 C4.0347,5.34204 5.56668,4.06403 7.40469,3.43506 C6.80469,4.54803 6.34869,5.74603 6.0257,6.99805 L6.0257,6.99805 Z M3.07669,14.998 L6.0257,14.998 C6.34869,16.249 6.80469,17.4481 7.40469,18.561 C5.56668,17.9321 4.0347,16.6541 3.07669,14.998 L3.07669,14.998 Z M2.26068,12.998 C2.0957,12.358 1.99969,11.6901 1.99969,10.998 C1.99969,10.306 2.0957,9.6381 2.26068,8.99805 L5.6377,8.99805 C5.55569,9.655 5.49969,10.319 5.49969,10.998 C5.49969,11.6771 5.55569,12.3411 5.6377,12.998 L2.26068,12.998 Z M9.9977,3.03406 C10.8317,4.23407 11.4817,5.56702 11.9097,6.99805 L8.0887,6.99805 C8.5157,5.56702 9.1657,4.23407 9.9977,3.03406 L9.9977,3.03406 Z M16.9207,6.99805 L13.9717,6.99805 C13.6487,5.74805 13.1927,4.55005 12.5927,3.43707 C14.4297,4.06805 15.9617,5.34406 16.9207,6.99805 L16.9207,6.99805 Z M9.9937,0.99805 C4.46768,0.99805 -0.00031,5.47504 -0.00031,10.998 C-0.00031,16.5211 4.46768,20.998 9.9937,20.998 C15.5207,20.998 19.9997,16.5211 19.9997,10.998 C19.9997,5.47504 15.5207,0.99805 9.9937,0.99805 L9.9937,0.99805 Z"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'chevron-down':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 12 8" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-353.000000, -585.000000)">
                    <g transform="translate(60.000000, 477.000000)">
                        <g transform="translate(292.000000, 108.000000)">
                            <polygon points="2.41348 0.58407 6.9995 5.1701 11.5855 0.58407 12.9995 1.99807 6.9995 7.9981 0.99948 1.99807"></polygon>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'minus':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 14 2" version="1.1" className="icon">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-823.000000, -212.000000)">
                    <g transform="translate(822.000000, 60.000000)">
                        <g transform="translate(0.000000, 151.000000)">
                            <polygon points="14.9994 2.998 0.99943 2.998 0.99995 1.0001 14.9994 0.998"></polygon>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    default:
      return null
  }
}

export default Icon;
