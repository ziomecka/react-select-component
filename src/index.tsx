import React from 'react';
import ReactDOM from 'react-dom';
import { Select, Components, defaultClassNames } from './select/';

import './index.sass';

const options = [
  'first',
  'second',
  'third',
  'fourth',
  'some extremely extremly long option',
];
const placeholder = 'Default-styled placeholder';
const label = 'Label';

const App: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          elementum congue molestie. Duis ultrices rhoncus blandit. Etiam sed
          scelerisque est, ut luctus urna. Nullam consequat eu ligula non
          sagittis. Nulla vulputate justo tristique felis rhoncus aliquam.
          Suspendisse eget pulvinar nisl. Suspendisse quis maximus sem. Morbi
          quam nisl, hendrerit non lacinia eu, congue ac metus.
        </span>
        <Select
        label={label}
          options={options}
          placeholder={'Custom-styled placeholder'}
          componentsProps={
            new Map([
              [
                Components.Placeholder,
                {
                  className: `${defaultClassNames.get(
                    Components.Placeholder,
                  )} foo-class-name`,
                },
              ],
            ])
          }
        />
      </div>
      <div>
        <span>
          Vivamus non aliquet lorem. Sed aliquam eleifend quam, nec vulputate
          velit. Donec non finibus ligula, vitae ornare lectus. Vestibulum id
          elit malesuada, tempus libero tristique, molestie ex. Morbi id aliquam
          urna, vel aliquet ligula. Praesent aliquet, massa semper venenatis
          lobortis, tortor tortor vestibulum felis, eget vestibulum dui elit
          quis lectus. Quisque a nulla ac dolor dapibus fringilla quis id sem.
        </span>
        <Select
          options={options}
          multiple={true}
          value={['first']}
          placeholder={placeholder}
        />
      </div>
      <div>
        <span>
          Integer pretium ornare leo, et luctus neque tristique in. Fusce
          bibendum felis at leo molestie, in varius nulla varius. Nullam
          consequat est elementum erat iaculis, sit amet tempor lacus mattis.
          Nam consectetur id nibh non mollis. Ut est nunc, vehicula eu faucibus
          sed, auctor at nisi. Sed tincidunt varius velit, sit amet imperdiet
          neque commodo ac. Sed at sapien id mi convallis vulputate ut eget
          massa. Curabitur hendrerit et tellus vitae tempor. Curabitur quis
          faucibus diam. Donec id neque eu purus pharetra dapibus vitae vitae
          ligula. Morbi ligula turpis, vehicula in gravida vel, euismod at odio.
        </span>
        <Select
          options={options}
          value={['first', 'second']}
          multiple={true}
          clearable={false}
          placeholder={placeholder}
        />
      </div>
      <div>
        <span>
          Fusce placerat neque nisi, quis commodo neque gravida vitae. Duis
          dapibus non libero ac tempus. Sed commodo fringilla pulvinar. Proin ac
          libero massa. Donec sit amet efficitur dui. Phasellus congue placerat
          mi. In non dui accumsan, interdum justo nec, fringilla diam.
          Suspendisse potenti. Suspendisse fermentum augue nec pharetra
          pharetra. Pellentesque suscipit, arcu et pulvinar consectetur, lorem
          massa dictum purus, eget lacinia nulla mauris et tortor. Pellentesque
          lobortis facilisis nibh vel imperdiet. In diam tellus, tincidunt vitae
          tempor et, rhoncus sed diam. Etiam auctor, turpis ac rhoncus
          pellentesque, nunc sem mollis diam, nec sodales leo nisi ut lectus.
          Fusce tempor lobortis mauris, eu lacinia lorem dignissim quis.
          Suspendisse ultrices nulla a dui tempor hendrerit.
        </span>
        <Select options={options} clearable={true} placeholder={placeholder} />
      </div>
      <div>
        <span>
          Donec ac odio purus. Donec ac lorem iaculis, luctus mauris sed,
          facilisis tellus. Ut sagittis magna laoreet, laoreet ex at, iaculis
          est. Aenean convallis, ante ac lacinia vulputate, tortor libero
          maximus urna, ut semper metus purus non nunc. Maecenas dictum magna
          vitae justo porttitor imperdiet. Suspendisse eleifend vel erat sit
          amet ultricies. Maecenas pharetra suscipit nisi, vitae finibus magna
          maximus iaculis. Sed aliquam ipsum eget orci sodales, sed sollicitudin
          augue ultricies. Proin vel hendrerit nulla.
        </span>
        <Select options={options} disabled={true} value={['second']} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
